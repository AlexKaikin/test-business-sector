import axios from 'axios'
import { SERVER_URL } from './url'

export const api = axios.create({ baseURL: SERVER_URL })
