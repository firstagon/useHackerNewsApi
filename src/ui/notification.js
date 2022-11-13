import classes from './notification.module.css'

const Notification = (props) => {
    // const errStatus = <div> {props.errStatus} </div>
    const errTitle = <div className={classes.title}> {props.title} </div>
    const errMessage = <div className={classes.message}> {props.message} </div>
    // console.log(props.title)
    // console.log(props.message)


    return (
        <div className={classes.container}>
            {errTitle}
            {errMessage}
        </div>
    )
};

export default Notification;