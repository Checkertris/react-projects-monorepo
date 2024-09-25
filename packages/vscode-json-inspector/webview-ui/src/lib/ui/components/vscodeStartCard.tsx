// border-editor-border border-l-4 border-0

export const VSCodeStartCard = (props: { children?: any }) => {
    return (
        <div className='mb-4 bg-editor rounded-lg p-3 pl-4  border-editor-border border-l-4 border-0'>
            {props.children}
        </div>
    )
}
export const VSCodeStartCardHeader = (props: { children: any }) => {
    return <h1 className='font-medium mb-1'>{props.children}</h1>
}

export const VSCodeStartCardContent = (props: { children: any }) => {
    return <div className='flex flex-col gap-4 text-sm text-muted-foreground'>{props.children}</div>
}
