import React, { Component } from "react"
import Card from "../components/card"
import FormGroup from "../components/form-group"
import { withRouter } from "react-router-dom"
import UsuarioService from "../app/service/usuarioService"
import * as messages from "../components/toastr"
import AuthService from "../app/service/authService"

class CadastroUsuario extends Component {

    constructor() {
        super()
        this.service = new UsuarioService
    }

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    cadastrar = () => {
        const { nome, email, senha, senhaRepeticao } = this.state
        const usuario = { nome, email, senha, senhaRepeticao }

        try {
            this.service.validar(usuario)
        } catch (erro) {
            const mensagens = erro.mensagens

            mensagens.forEach(msg => {
                messages.mensagemErro(msg)
            })
            return false
        }

        this.service.salvar(usuario).then(response => {
            messages.mensagemSucesso("Usuário cadastrado com sucesso! Faça o login para acessar o sistema.")
            this.props.history.push('/login')
        }).catch(erro => {
            messages.mensagemErro(erro.response.data)
        })
    }

    cancelar = () => {
        if(!AuthService.isUsuarioAutenticado) {
            this.props.history.push('/login')
        }else {
            this.props.history.push('/home')
        }
    }

    render() {
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome" >
                                <input type="text"
                                    className="form-control"
                                    id="inputNome"
                                    name="nome"
                                    onChange={e => this.setState({ nome: e.target.value })}
                                    placeholder="Digite o Nome" />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email"
                                    className="form-control"
                                    id="inputEmail"
                                    name="email"
                                    onChange={e => this.setState({ email: e.target.value })}
                                    placeholder="Digite o Email" />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password"
                                    className="form-control"
                                    id="inputSenha"
                                    name="senha"
                                    onChange={e => this.setState({ senha: e.target.value })}
                                    placeholder="Password" />
                            </FormGroup>
                            <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                <input type="password"
                                    className="form-control"
                                    id="inputRepitaSenha"
                                    name="senha"
                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })}
                                    placeholder="Password" />
                            </FormGroup>
                            <button
                                onClick={this.cadastrar}
                                type="button"
                                className="btn btn-success">
                                <i className="pi pi-save"></i> Salvar
                            </button>
                            <button
                                type="button"
                                onClick={this.cancelar}
                                className="btn btn-danger">
                                <i className="pi pi-times"></i> Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

}

export default withRouter(CadastroUsuario)