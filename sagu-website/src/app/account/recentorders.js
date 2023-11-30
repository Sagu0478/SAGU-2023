import React from 'react'
import { useAppContext } from "@/contexts/Provider.js";
function recentorders({user}){

    const {user} = useAppContext();
    return (
        <div>
            <div className="flex grid-col-3 text-md p-2">
                <div>
                    
                </div>

            </div>
        </div>
    )
}

export default recentorders;