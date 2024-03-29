import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import UsuarioService from "../app/service/usuarioService"
import { AuthContext } from "../main/provedorAutenticacao"
import currencyFormatter from "currency-formatter"

class Home extends Component {

    state = {
        saldo: 0,
        nome: ''
    }

    constructor() {
        super()
        this.service = new UsuarioService
    }

    componentDidMount() {
        const usuarioLogado = this.context.usuarioAutenticado

        this.service.obterSaldoPorUsuario(usuarioLogado.id)
            .then(response => {
                this.setState({ saldo: response.data })
            }).catch(erro => {
                console.error(erro.response)
            })
            this.setState({nome: usuarioLogado.nome})
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <h3>{this.state.nome}</h3>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de <span style={{color:'green', fontFamily:'fantasy'}}>{currencyFormatter.format(this.state.saldo, { locale: 'pt-BR' })}</span></p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg"
                        href="/cadastro-usuarios"
                        role="button"><i className="pi pi-users"></i>
                        &nbsp; Cadastrar Usuário
                    </a>
                    <a className="btn btn-danger btn-lg"
                        href="/cadastro-lancamentos"
                        role="button"><i className="pi pi-money-bill"></i>
                        &nbsp; Cadastrar Lançamento
                    </a>
                </p>
            </div>
        )
    }
}

Home.contextType = AuthContext

export default withRouter(Home)