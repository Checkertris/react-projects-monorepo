import { commands, FileType, Uri, window, workspace } from 'vscode'
import { FileEdit, type FileData } from '~/lib'
import ignore from 'ignore'
import micromatch from 'micromatch'

const SEARCH_THRESHOLD = 500
const WARNING_MESSAGE = `Search results exceed ${SEARCH_THRESHOLD} files. Consider using a .gitignore file in workspace, or configuring "search.exclude" in settings to improve performance.`
const SEARCH_EXCLUDE_QUERY = '@feature:search search.exclude'

const CONFIGURE_SETTINGS = 'Configure "search.exclude"'
const OPEN_GIT_IGNORE = 'Open .gitignore'
const CREATE_GIT_IGNORE = 'Create .gitignore'

export class FileSearch {
    private static async findGit(uri: Uri) {
        return await FileEdit.readDirectory(
            uri,
            (file) => file.type == FileType.File && file.name == '.gitignore'
        ).then((results) => results[0])
    }

    private static async gitFilter(uri: Uri) {
        const patterns = await this.findGit(uri).then((file) => {
            if (!file) return []
            return workspace.fs.readFile(file.uri).then((text) =>
                text
                    .toString()
                    .split('\n')
                    .filter((pattern) => pattern.charAt(0) != '#')
            )
        })

        if (patterns.length == 0) return () => true

        const filter = ignore()
            .add([...patterns, '.git'])
            .createFilter()

        return (file: FileData) => {
            const gitPath = FileEdit.formatPath(file.uri, false, false)
            if (gitPath == '') return true
            return file.name != '.git' && filter(gitPath)
        }
    }

    private static settingsFilter(uri: Uri) {
        const config = workspace.getConfiguration(undefined, uri).get('search.exclude')

        if (!config) return () => true

        const patterns = Object.entries(config)
            .filter(([key, value]) => value == true)
            .map(([key, value]) => key)

        if (patterns.length == 0) return () => true

        return (file: FileData) => {
            return !micromatch.isMatch(file.uri.path, patterns)
        }
    }

    private static async defaultFilter(uri: Uri) {
        const git = await this.gitFilter(uri)
        const settings = this.settingsFilter(uri)
        return (file: FileData) => file.name != '.vscode' && git(file) && settings(file)
    }

    private static async testThreshold(count: number) {
        if (count < SEARCH_THRESHOLD) return

        console.log(`SEARCH EXCEEDED ${SEARCH_THRESHOLD}`, count)

        const root: undefined | Uri = workspace.workspaceFolders![0]!.uri

        if (!root) {
            return window
                .showInformationMessage(WARNING_MESSAGE, CONFIGURE_SETTINGS)
                .then(executeAction)
        }

        const git = await this.findGit(root)
        if (git) {
            return window
                .showInformationMessage(WARNING_MESSAGE, OPEN_GIT_IGNORE, CONFIGURE_SETTINGS)
                .then(executeAction)
        }

        return window
            .showInformationMessage(WARNING_MESSAGE, CREATE_GIT_IGNORE, CONFIGURE_SETTINGS)
            .then(executeAction)

        function executeAction(results: string | undefined) {
            switch (results) {
                case CONFIGURE_SETTINGS:
                    commands.executeCommand('workbench.action.openSettings', SEARCH_EXCLUDE_QUERY)
                    break
                case OPEN_GIT_IGNORE:
                    if (git) workspace.openTextDocument(git.uri)
                    break

                case CREATE_GIT_IGNORE:
                    if (root) {
                        const uri = Uri.joinPath(root, '.vscodeignore')
                        FileEdit.editWorkspace([{ type: 'file', uri: uri }]).then(() =>
                            workspace.openTextDocument(uri)
                        )
                    }
            }
        }
    }

    public static async getAllWorkspaceFolders() {
        if (workspace.workspaceFolders) {
            const dirs = await Promise.all(
                workspace.workspaceFolders.map(async (root) =>
                    FileEdit.getAllDirectories(root.uri, await this.defaultFilter(root.uri))
                )
            )
            this.testThreshold(dirs.reduce((prev, dir) => prev + dir.length, 0))
            return dirs
        }
        return []
    }
}
