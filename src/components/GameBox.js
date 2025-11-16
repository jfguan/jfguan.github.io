import '../css/GameBox.css'

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
