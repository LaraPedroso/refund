import { BrowserRouter } from 'react-router'
import { AuthRoutes } from './auth-routes'
import { EmployeeRoutes } from './EmployeeRoutes'


export function Routes() {
    return (
        <BrowserRouter>
            <EmployeeRoutes/>
        </BrowserRouter>
    )
}