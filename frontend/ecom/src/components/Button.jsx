import React, { forwardRef } from 'react'
import { Button } from '@mui/material'


export const ButtonC = forwardRef(({
    children,
    variant = 'contained',
    // color = 'primary',
    ...props
}, ref) => {
    return <button variant={variant} inputref={ref} {...props}>{children}</button>
})
