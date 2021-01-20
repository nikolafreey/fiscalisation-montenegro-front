import React from 'react'
import NoviRacunKusur from './NoviRacunKusur';

class NoviRacunPrintTemplate extends React.Component {
    render() {
        return (
            <div className="side-info" style={{ width: '60%' }}>
                <div className="side-info__wrapper">
                    <p className="txt-light txt-up">ukupno</p>
                    <h1 className="heading-primary">
                        {this.props.ukupnaCijena.toFixed(2).replace('.', ',')}{' '}
                        <span className="txt-light">€</span>
                    </h1>
                </div>

                {this.props.usluge}
                {this.props.robe}

                <hr />
                <div className="row mb-15">
                    {Object.keys(this.props.porezi).map((porezId) => (
                        <>
                            <div className="col-lg-8">
                                <p>Ukupno za {this.props.porezi[porezId].naziv}</p>
                            </div>
                            <div className="col-lg-4">
                                <p className="txt-right">
                                    {this.props.porezi[porezId].ukupno.toFixed(2).replace('.', ',') + '€'}
                                </p>
                            </div>
                            <div className="col-lg-8">
                                <p>{this.props.porezi[porezId].naziv}</p>
                            </div>
                            <div className="col-lg-4">
                                <p className="txt-right">
                                    {this.props.porezi[porezId].pdvIznos.toFixed(2).replace('.', ',') + '€'}
                                </p>
                            </div>
                        </>
                    ))}
                </div>
                <hr />
                <div className="row mb-20">
                    <div className="col-lg-8">
                        <p>Ukupan PDV</p>
                    </div>
                    <div className="col-lg-4">
                        <p className="txt-right">
                            {Number(this.props.ukupnaCijena - this.props.ukupnaCijenaBezPdv)
                                .toFixed(2)
                                .replace('.', ',') + '€'}
                        </p>
                    </div>
                    <div className="col-lg-7">
                        <p>Ukupno za plaćanje</p>
                    </div>
                    <div className="col-lg-5">
                        <p className="txt-right">
                            {this.props.ukupnoPlacanje.toFixed(2).replace('.', ',') + '€'}
                        </p>
                    </div>
                </div>
                <NoviRacunKusur ukupnaCijena={this.props.ukupnaCijena} />
            </div>
        )
    }
}

export default NoviRacunPrintTemplate;