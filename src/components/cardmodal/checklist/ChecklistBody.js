import React from 'react'
import ChecklistBodyLoop from './ChecklistBodyLoop'
function ChecklistBody({id,list,cardID}) {

    return (
        <div>
            {
                list && 
                list.map(list => {
                    return (
                        <ChecklistBodyLoop key={list.id} id={id} list={list} cardID={cardID}/>
                    )
                })
            }
        </div>
    )
}

export default ChecklistBody
