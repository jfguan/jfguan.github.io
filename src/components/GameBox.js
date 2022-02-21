import '../css/GameBox.css'

const calculateTimeLeft = () => {
    let year = new Date().getFullYear();

    const difference = +new Date(`10/01/${year}`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    }
    return timeLeft;
};

export const GameBox = ({seconds, score}) => {
    return(
        <div className='gameBox'>
            <div className='genBox timerBox'>
                Time left: {Math.floor(seconds/60)}:{Math.floor(seconds % 60 / 10)}{seconds % 60 % 10}
            </div>
            <div className='genBox scoreBox'>
                Score: {score}
            </div>
        </div>
    )
}