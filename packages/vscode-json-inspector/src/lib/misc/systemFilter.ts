import { commands, window, workspace } from 'vscode'
import { ErrorAction, type FileData } from '~/lib'
import micromatch from 'micromatch'

const SEARCH_THRESHOLD = 500
const WARNING_MESSAGE = `Search results exceed ${SEARCH_THRESHOLD} files. Configuring the "search.exclude" setting to improve performance.`
const SEARCH_EXCLUDE_QUERY = '@feature:search search.exclude'
const CONFIGURE_BUTTON = 'Configure'

export class SystemFilter {
    private count: number = 0
    public filter: (file: FileData) => boolean

    constructor(private readonly myFilter?: ((file: FileData) => boolean) | undefined) {
        let settingsFilter: ((file: FileData) => boolean) | undefined
        const config = workspace.getConfiguration().get('search.exclude')
        if (config) {
            const patterns = Object.entries(config)
                .filter(([key, value]) => value == true)
                .map(([key, value]) => key)
            if (patterns.length > 0) {
                settingsFilter = (file) => micromatch.isMatch(file.uri.path, patterns)
            }
        }

        this.filter = (file: FileData) => {
            if (settingsFilter && settingsFilter(file)) return false
            if (this.myFilter) {
                if (!this.myFilter(file)) return false
                this.count++
                return true
            }
            this.count++
            return true
        }
    }

    public test() {
        return new Promise<void>(async (resolve, reject) => {
            if (this.count < SEARCH_THRESHOLD) resolve()
            reject(
                new ErrorAction(async () => {
                    const results = await window.showInformationMessage(
                        WARNING_MESSAGE,
                        CONFIGURE_BUTTON
                    )
                    if (results) {
                        commands.executeCommand(
                            'workbench.action.openSettings',
                            SEARCH_EXCLUDE_QUERY
                        )
                    }
                })
            )
        })
    }
}
