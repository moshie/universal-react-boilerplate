import { api } from '../../src/config'
import path from 'path'

exports.apiRoute = (route = '') => {
    if (typeof route !== 'string' || !route.length) {
        return route;
    }

    return path.join(api, route)
}