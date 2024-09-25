export const Section = (props: { children?: any; label: string }) => {
    return (
        <div className='px-5'>
            <h2 className='mb-2 tracking-widest uppercase text-xs text-muted-foreground px-5'>
                {props.label}
            </h2>
            <div className='space-y-1.5'>{props.children}</div>
        </div>
    )
}
