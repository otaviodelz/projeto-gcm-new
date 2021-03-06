import React, { Component } from 'react';
import PrimeiroPasso from './Passos/PrimeiroPasso';
import TerceiroPasso from './Passos/TerceiroPasso';
import QuartoPasso from './Passos/QuartoPasso';
import QuintoPasso from './Passos/QuintoPasso';
import PassoFinal from './Passos/PassoFinal';
import TelaInicial from './TelaInicial';
import SegundoPasso from './Passos/SegundoPasso';

const initialState = {
    numeroDaOcorrencia: '',
    data: '',
    horaFato: '',
    numTalao: '',
    viatura: '',
    horaDeIrradiacao: '',
    horaLocal: '',
    primeiroTermino: '',
    segundoTermino: '',
    kmDeIrradiacao: '',
    kmLocal: '',
    kmPrimeiroTermino: '',
    kmSegundoTermino: '',
    relatorioDaGCM: '',
    oficial: {
        id: 1
    },
    ocorrencias: [],
    local: '',
    bairro: {
        id: ''
    },
    envolvidos: [],
    veiculos: [],            
}

export default class Registra extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    clearState = () => {
        this.setState({...initialState});
    }

    handleChange = input => e => {
        if (this.identificadorInt(input)) {
            this.setState({
                [input]: parseInt(e.target.value)
            })
        } else {
            this.setState({
                [input]: e.target.value
            })
        }
    }

    identificadorInt(value) {
        const campos = ['numTalao', 'viatura', 'numeroDaOcorrencia',
            'kmIrradiacao', 'kmLocal', 'kmPrimeiroTermino', 'kmSegundoTermino'];

        return !(campos.indexOf(value) === -1)
    }

    render() {


        

        switch(this.props.step) {
            case 1: 
                return (
                <div>
                    <p className="titulo"> Passo {this.props.step} de 6:</p>
                    <PrimeiroPasso prevStep={this.props.prevStep} nextStep={this.props.nextStep} values={this.state} handleChange={this.handleChange}
                    resetStep={this.props.resetStep}/>
                </div>
                )
            case 2:
                return <SegundoPasso prevStep={this.props.prevStep} nextStep={this.props.nextStep} values={this.state} handleChange={this.handleChange} />;
            case 3:
                return <TerceiroPasso prevStep={this.props.prevStep} nextStep={this.props.nextStep} values={this.state} handleChange={this.handleChange} />;
            case 4:
                return <QuartoPasso prevStep={this.props.prevStep} nextStep={this.props.nextStep} values={this.state} handleChange={this.handleChange} />;
            case 5:
                return <QuintoPasso prevStep={this.props.prevStep} nextStep={this.props.nextStep} values={this.state} handleChange={this.handleChange} />;
            case 6:
                return <PassoFinal prevStep={this.props.prevStep} nextStep={this.props.nextStep} values={this.state} handleChange={this.handleChange}
                        online={this.props.online} clearState={this.clearState} step={this.props.step} resetStep={this.props.resetStep} />;
            default:
                return <TelaInicial />;
        }
        

    }

}