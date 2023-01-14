import localStorageService from "./localStorageService";
import jwtDecode from "jwt-decode";
import ApiService from "../apiservice";

export const USUARIO_LOGADO = '_usuario_logado'
export const TOKEN = 'access_token'

export default class AuthService {

    static isUsuarioAutenticado() {
        const token = localStorageService.obterItem(TOKEN)
        if (token) {
            const decodedToken = jwtDecode(token)
            const expiration = decodedToken.horaExpiracao
            const isTokenValido = Date.now() >= (expiration * 1000)
            return !isTokenValido
        }
    }

    static removerUsuarioAutenticado() {
        localStorageService.removerItem(USUARIO_LOGADO)
        localStorageService.removerItem(TOKEN)
    }

    static logar(usuario, token) {
        localStorageService.adicionarItem(USUARIO_LOGADO, usuario)
        localStorageService.adicionarItem(TOKEN, token)
        ApiService.registrarToken(token)
    }

    static obterUsuarioAutenticado() {
        return localStorageService.obterItem(USUARIO_LOGADO)
    }

    static refreshSession() {
        const token = localStorageService.obterItem(TOKEN)
        const usuario = AuthService.obterUsuarioAutenticado()
        this.logar(usuario, token)
        return usuario
    }
}