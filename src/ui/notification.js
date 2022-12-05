import classes from './notification.module.css'
import { useState, useEffect } from 'react';

const Notification = (props) => {

    const errTitle = <div className={classes.title}> {props.title} </div>
    const errMessage = <div className={classes.message}> {props.message} </div>

    const [mounted, setMounted] = useState(false);

    const mountedCSS = mounted ? ' ' + classes._mounted : '';


    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 10);
        return () =>  {
            setMounted(false);
            clearTimeout(timer)};
    }, [])


    return (
        <div className={classes.container + ' ' + mountedCSS}>
            {errTitle}
            {errMessage}
        </div>
    )
};

export default Notification;