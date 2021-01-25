import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ERRORS, RACUNI } from '../constants/routes';
import RacuniForm from '../components/Racuni/RacuniForm';
import Racun from '../components/Racuni/Racun';
import Racuni from '../components/Racuni/Racuni';
import NoviRacun from '../components/Racuni/NoviRacun/NoviRacun';
import Bezgotovinski from '../components/Racuni/Bezgotovinski/Bezgotovinski';
import BezgotovinskiPreview from '../components/Racuni/Bezgotovinski/BezgotovinskiPreview';

const RacuniRouter = () => {
  return (
    <Switch>
      <Route path={RACUNI.BEZGOTOVINSKI.CREATE}>
        <Bezgotovinski />
      </Route>
      <Route path={RACUNI.BEZGOTOVINSKI.SHOW}>
        <BezgotovinskiPreview />
      </Route>
      <Route path={RACUNI.BEZGOTOVINSKI.EDIT}>
        <BezgotovinskiPreview />
      </Route>
      <Route path={RACUNI.EDIT}>
        <RacuniForm />
      </Route>
      <Route path={RACUNI.CREATE}>
        <NoviRacun />
      </Route>
      <Route path={RACUNI.SHOW}>
        <Racun />
      </Route>
      <Route exact path={RACUNI.INDEX}>
        <Racuni />
      </Route>
      <Redirect to={ERRORS.NOT_FOUND} />
    </Switch>
  );
};

export default RacuniRouter;
