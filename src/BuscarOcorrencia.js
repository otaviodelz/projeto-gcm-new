import React, { Component } from 'react';
import { getOcorrenciaById } from './services/ocorrencia';
import axios from 'axios';
import Table from './Table'
import PopUp from './components/PopUp'

export default class BuscarOcorrencia extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ocorrencia: {},
            id: '',
            show: 0,
            show2: 1
        }

        this.handleChange = this.handleChange.bind(this)
        this.testeGet = this.testeGet.bind(this)
    }

    componentDidMount() {
        console.log(this.props.online ? 'Está online' : 'Não está')
    }

    testeGet = id => e => {
        e.preventDefault();

        const online = this.props.online;

        if (online === false) {
            getOcorrenciaById((ocorrencia) => {
                if (ocorrencia !== this.state.ocorrencia) {
                    this.setState({
                        ocorrencia: ocorrencia,
                        show: 2
                    })
                } else {
                    PopUp.exibeMensagem('error', 'Batata')
                }

                console.log(this.state.ocorrencia)
            }, id)
        } else {
            const id = this.state.id;
            axios.get("https://cors-anywhere.herokuapp.com/https://gcm-mogi.herokuapp.com/boletins/" + id)
                .then(res => {
                    this.setState({
                        ocorrencia: res.data,
                        show: 2
                    })
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    handleChange(e) {
        e.preventDefault();

        this.setState({
            id: parseInt(e.target.value)
        })

        this.setState({
            show: !this.state.show
        })
    }

    testeOnOff = e => {
        e.preventDefault();

        const online = this.props.online;

        console.log(online)
    }

    teste(e) {
        e.preventDefault()
        const validacao = this.props.online;
        console.log(validacao);
    }

    render() {
        
        return (
            <div className="container">
                <p className="titulo">Buscar Ocorrência</p>
                <form className="col s10">
                    <div className="row">
                        <div className="input-field col s6 offset-s2">
                            <input name='id' onChange={this.handleChange} type="number" id="buscaId" />
                            <label htmlFor="buscaId">Digite o numero da ocorrência</label>
                        </div>
                        <button onClick={this.testeGet(this.state.id)} className="waves-effect waves-light btn red darken-1"><i className="material-icons">Get</i></button>
                        <button onClick={this.testePost} className="waves-effect waves-light btn red darken-1"><i className="material-icons">Post</i></button>
                        <button onClick={this.testePut} className="waves-effect waves-light btn red darken-1"><i className="material-icons">Put</i></button>
                        <br />
                        <button onClick={this.testeOnOff} className="waves-effect waves-light btn red darken-1"><i className="material-icons">Teste On/Off</i></button>

                    </div>
                </form>

                {this.state.show === 2 ? <Table values={this.state.ocorrencia} /> : console.log("batatan")}

            </div>
        );
    }
}