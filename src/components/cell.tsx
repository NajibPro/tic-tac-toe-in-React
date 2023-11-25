import './cell.css';

import xImage from '../assets/x_small.svg';
import oImage from '../assets/o_small.svg';

interface CellProps {
    cellNumber: number;
    clickedBy: string;
    handleCellClick: (cellNumber: number) => void;
  }

function Cell({ cellNumber, clickedBy, handleCellClick } : CellProps){

    function getCellContent(){
        if(clickedBy === "x"){
            return <img src={xImage} width={44} height={44} alt="x"></img>;
        } else if(clickedBy === "o"){
            return <img src={oImage} width={44} height={44} alt="o"></img>;
        }

        return <div></div>;
    }

    function handleClickEvent(){
        handleCellClick(cellNumber);  
    }

    return (
        <div className="cell" onClick={handleClickEvent}>
            {getCellContent()}
        </div>
    );
}

export default Cell;