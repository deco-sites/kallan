


export interface DropDownFilterProps{
filterTitle?:string,
children?: React.FC
}

function DropDownFilter({filterTitle = 'Categoria',children}:DropDownFilterProps){
    return (
        <div class="w-1/3 font-roboto ">
            <h5 class="before-icon">{filterTitle}</h5>
        </div>
    )
}

export default DropDownFilter


