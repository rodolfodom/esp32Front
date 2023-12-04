import { FormControlLabel, Switch } from "@mui/material"
import { useState } from "react"

export default function EncenderLuces({luces, socket}){
        const [reload, setReload] = useState(false)
        return(
                <FormControlLabel
                control={<Switch color="primary" />}
                label="Encender luces"
                labelPlacement="top"
                onChange={(e) => {
                    luces.current = e.target.checked? 1 : 0
                    socket.send(JSON.stringify({
                        type: "esp32_action",
                        luces: luces.current
                    }))
                    setReload(!reload)                
                }}
                value={luces}
                checked={luces.current == 1? true : false}
                />
        )
 }