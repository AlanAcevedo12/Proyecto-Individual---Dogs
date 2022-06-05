import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllDogs} from "../../redux/actions/actions";

import CardContainer from "../CardContainer/CardContainer";

export default function Home(){
    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.dogs);

    React.useEffect(
        () => {
            dispatch(getAllDogs())
        }, [dispatch]
    );

    return(
        <div className="HomeDiv">
            <h1>HOME :D</h1>
            <CardContainer dogs= {dogs}/>
        </div>
    )
}