import { Typography } from "@mui/material"

export default function TiempoReal({coordinates}){
    return(
        <>
            <Typography variant="h5" component="div" gutterBottom>
                Latitud:
            </Typography>
            <Typography variant="body" component="div" gutterBottom>
                {coordinates.lat}
            </Typography>
            <Typography variant="h6" component="div" gutterBottom>
                Longitud:
            </Typography>
            <Typography variant="body" component="div" gutterBottom>
                {coordinates.lng}
            </Typography>
        </>
    )
}
