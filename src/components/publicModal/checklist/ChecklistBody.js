import React from 'react'
import ChecklistBodyLoop from './ChecklistBodyLoop'
function ChecklistBody({ list }) {

    return (
        <div>
            {
                list && 
                list.map(list => {
                    return (
                        <ChecklistBodyLoop key={list.id} list={list}/>
                    )
                })
            }
        </div>
    )
}

export default ChecklistBody
