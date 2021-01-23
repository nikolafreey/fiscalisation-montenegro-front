import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { ReactComponent as LinkSvg } from '../../../assets/icon/link.svg';

import { RACUNI } from '../../../constants/routes';
import BezgotovinskiShowTemplate from "./BezgotovinskiShowTemplate"

import {
    deleteRacun,
    getRacun,
    storeRacun,
    updateRacun,
} from '../../../store/actions/RacuniActions';
import { racunSelector } from '../../../store/selectors/RacuniSelector';
import { useRouteMatch } from 'react-router-dom';

const BezgotovinskiPreview = () => {
    const { params } = useRouteMatch();
    const dispatch = useDispatch();
    const componentRef = useRef();

    useEffect(() => {
        console.log('---------', params)
        if (params.id) dispatch(getRacun(params.id));
    }, [params]);

    const racun = useSelector(racunSelector());
    console.log('GetRacunById', racun)

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <>
            <div className="screen-content">
                <Link to={RACUNI.INDEX} className="link df">
                    <LinkSvg /> <p>Povratak na Račune</p>
                </Link>
            </div>

            <div className="title">
                <h1 className="heading-primary">Račun {racun.broj_racuna}</h1>

                <div className="df w-50 jc-end">
                    <button className="btn btn__transparent  mr-m" onClick={handlePrint}>
                        <svg className="icon icon__dark lg mr-xs" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                  Štampaj
                </button>
                    <button className="btn btn__dark">
                        <svg className='icon icon__light lg mr-xs' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5234 21.0469C4.98633 21.0469 0.425781 16.4766 0.425781 10.9492C0.425781 5.42188 5.00586 0.851562 10.5332 0.851562C15.6699 0.851562 19.9668 4.78711 20.543 9.77734C19.9375 9.64062 19.1367 9.60156 18.4922 9.70898C17.916 5.82227 14.5957 2.87305 10.5332 2.87305C6.05078 2.87305 2.4375 6.4668 2.4375 10.9492C2.4375 13.0879 3.25781 15.0215 4.61523 16.457C5.62109 15.3438 7.75 14.3281 10.5332 14.3281C11.4023 14.3281 12.2129 14.4258 12.9453 14.6016C12.8281 15.0703 12.7695 15.5586 12.7695 16.0566C12.7695 17.6484 13.3848 19.123 14.3809 20.2656C13.1895 20.7637 11.8809 21.0469 10.5234 21.0469ZM10.5332 12.7266C8.63867 12.7363 7.16406 11.125 7.16406 9.03516C7.16406 7.0625 8.64844 5.41211 10.5332 5.41211C12.4082 5.41211 13.9121 7.0625 13.8926 9.03516C13.8828 11.125 12.4277 12.707 10.5332 12.7266ZM19.1953 21.0957C16.4609 21.0957 14.166 18.8105 14.166 16.0566C14.166 13.3027 16.4316 11.0273 19.1953 11.0273C21.9492 11.0273 24.2246 13.3027 24.2246 16.0566C24.2246 18.8203 21.9492 21.0957 19.1953 21.0957ZM22.3887 16.0566C22.3887 15.6562 22.1152 15.3926 21.7148 15.3926H19.8691V13.5469C19.8691 13.1465 19.6055 12.873 19.1953 12.873C18.7852 12.873 18.5215 13.1465 18.5215 13.5469V15.3926H16.6758C16.2754 15.3926 16.002 15.6562 16.002 16.0566C16.002 16.4668 16.2754 16.7305 16.6758 16.7305H18.5215V18.5859C18.5215 18.9863 18.7852 19.2598 19.1953 19.2598C19.6055 19.2598 19.8691 18.9863 19.8691 18.5859V16.7305H21.7148C22.1152 16.7305 22.3789 16.4668 22.3887 16.0566Z" fill="#F9FAFB" />
                        </svg>
                        <p>Dodaj preglednika</p>
                    </button>
                </div>

            </div>
            <div className="main-content__box">
                <BezgotovinskiShowTemplate ref={componentRef} racun={racun} />
            </div>
        </>
    )
}


export default BezgotovinskiPreview;