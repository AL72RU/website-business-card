import React, { useEffect, useRef, useState } from 'react';
import { Box, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { ArrowBack, Gesture, QuestionMark } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const box = 44;
const rows = 10;
const columns = 8;
const snakeStep = 1;
const speedGame = 8;
const foodRadius = Math.round(box/100*90/2);
const foodColor = '#FF0000';
const snakeWidth = Math.round(box/100*90);
const snakeColor = '#5cef05';

export default function Snake() {
  const canvasRef = useRef();
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [food, setFood] = useState({ x: 4, y: 2 });
  const [snake, setSnake] = useState([{ x: 3*box+box/2, y: 7*box+box/2 }]);
  const [directions, setDirections] = useState([0]);
  const [skipSteps, setSkipSteps] = useState(0);
  const [onTarns, setOnTarns] = useState(new Set([]));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawBack = () => {
      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.moveTo((box/2), (box/2)+j*box);
          ctx.lineTo((box/2)+box*(columns-1), (box/2)+j*box);
          ctx.strokeStyle = '#3d444d';
          ctx.stroke();
        }
        for (let j = 0; j < rows; j++) {
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.moveTo((box/2)+i*box, (box/2));
          ctx.lineTo((box/2)+i*box, (box/2)+box*(rows-1));
          ctx.strokeStyle = '#3d444d';
          ctx.stroke();
        }
      }
    };

    const drawFood = () => {
      const pi = Math.PI;
      ctx.beginPath();
      ctx.fillStyle = foodColor;
      ctx.arc(box/2+food.x*box, box/2+food.y*box, foodRadius, 0, 2*pi, false);
      ctx.fill();
      ctx.closePath();
    };

    const drawSnake = () => {
      if (snake.length === 1) {
        const pi = Math.PI;
        ctx.beginPath();
        ctx.fillStyle = snakeColor;
        ctx.arc(snake[0].x, snake[0].y, snakeWidth/2, 0, 2*pi, false);
        ctx.fill();
        ctx.closePath();
      } else {
        ctx.beginPath();
        ctx.lineWidth = snakeWidth;
        ctx.strokeStyle = snakeColor;
        ctx.lineCap = 'round';
        for (let i = 0; i < snake.length; i++) {
          if (i) {
            ctx.lineTo(snake[i].x, snake[i].y);
          } else {
            ctx.moveTo(snake[i].x, snake[i].y);
          }
        }
        ctx.stroke();
      }
    };

    const checkCollisionFood = (newFood) => {
      for (const item of snake) {
        if (item.x === box/2+box*newFood.x && item.y === box/2+box*newFood.y) {
          return true;
        }
      }
      return false;
    };

    const isWin = () => {
      if (score === rows * columns -1) {
        clearInterval(game);
      }
    };

    const gameOver = () => {
      setDirections([0]);
      setSnake([{ x: box/2+box*(3), y: box/2+box*(7) }]);
      setFood({ x: 4, y: 2 });
      setScore(0);
      clearInterval(game);
    };

    function eatFood(head) {
      if (snake[0].x === box/2+box*(food.x) && snake[0].y === box/2+box*(food.y)) {
        setScore(prevState => prevState + 1);
        setSkipSteps(box-1);

        isWin();

        const newFood = {};
        do {
          newFood.x = Math.floor(Math.random() * (columns));
          newFood.y = Math.floor(Math.random() * (rows));
        } while (checkCollisionFood(newFood));
        setFood(newFood);
      } else {
        if (skipSteps) {
          setSkipSteps(prevState => prevState - 1);
        } else {
          // удаляет последний элемент в массиве
          setSnake(prevState => prevState.filter((item, index) => index !== prevState.length-1 ));
        }
      }
    }

    function collision() {
      if (snake.length > 3*box+1) {
        const head = { ...snake[0] };
        const tail = [...snake.slice(box*3+1)];

        // Neck removal
        // for (let i = 0; i < box*4; i++) {
        //   tail.shift();
        // }

        for (const item of tail) {
          if ((head.x > item.x - box/2 && head.x < item.x + box/2)
            && (head.y > item.y - box/2 && head.y < item.y + box/2)) {
            gameOver();
          }
        }
      }

      if ((snake[0].x < box/2) || (snake[0].x > box*columns-box/2)
        || (snake[0].y < box/2) || (snake[0].y > box*rows-box/2)) {
        gameOver();
      }
    }

    function step() {
      const newSnake = [...snake];
      let snakeX = newSnake[0].x;
      let snakeY = newSnake[0].y;

      if (onTarns.has(snakeY)) {
        if (directions[0] === 37) {snakeX -= snakeStep;}
        if (directions[0] === 39) {snakeX += snakeStep;}
      }
      if (onTarns.has(snakeX)) {
        if (directions[0] === 38) {snakeY -= snakeStep;}
        if (directions[0] === 40) {snakeY += snakeStep;}
      }
      let newHead = {
        x: snakeX,
        y: snakeY
      };
      setSnake(prevState => {
        const newSnake = [newHead, ...prevState];
        return newSnake;
      });

      if (onTarns.has(snakeY) && onTarns.has(snakeX)) {
        setDirections(prevState => {
          let newDirections = [...prevState];
          if (newDirections.length === 2) {
            newDirections.shift();
            return [...newDirections];
          } else {
            return [...newDirections];
          }
        });
      }
    }

    const drawGame = () => {
      ctx.clearRect(0, 0, box*columns, box*rows);
      //drawBack();
      drawFood();
      drawSnake();

      eatFood();
      step();
      collision();
    };

    const game = setInterval(drawGame, speedGame);

    return () => {
      clearInterval(game);
    };
  }, [score, snake, food, directions, skipSteps, onTarns]);

  useEffect(() => {
    // Loading max score
    const savedScore = localStorage.getItem('snakeScore');
    if (savedScore) {
      setMaxScore(Number(savedScore));
    }

    // Creating an array of allowed turns
    const tarnsArray = new Set([]);
    for (let i = 0; i <= rows; i++) {
      tarnsArray.add(i*box+box/2);
    }
    setOnTarns(tarnsArray);

    // Button click events
    const handleKeyPress = ((event) => {
      const nextDirections = new Set([]);

      switch (event.keyCode) {

        // Right
        case 39:
          setDirections((prevState) => {
            let newDirections = [...prevState];
            if (newDirections.length === 1) {
              if ((prevState[prevState.length-1] !== 37) && (prevState[prevState.length-1] !== 39)) {
                return [...newDirections, 39];
              }
            }
            return [...newDirections];
          });
          break;

        // Left
        case 37:
          setDirections((prevState) => {
            let newDirections = [...prevState];
            if (newDirections.length === 1) {
              if ((prevState[prevState.length-1] !== 39) && (prevState[prevState.length-1] !== 37)) {
                return [...newDirections, 37];
              }
            }
            return [...newDirections];
          });
          break;

        // Up
        case 38:
          setDirections((prevState) => {
            let newDirections = [...prevState];
            if (newDirections.length === 1) {
              if ((prevState[prevState.length-1] !== 40) && (prevState[prevState.length-1] !== 38)) {
                return [...newDirections, 38];
              }
            }
            return [...newDirections];
          });
          break;

        // Down
        case 40:
          setDirections((prevState) => {
            let newDirections = [...prevState];
            if (newDirections.length === 1) {
              if ((prevState[prevState.length-1] !== 38) && (prevState[prevState.length-1] !== 40)) {
                return [...newDirections, 40];
              }
            }
            return [...newDirections];
          });
          break;

        default: break;
      }
    });
    window.addEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    if (score > maxScore) {
      setMaxScore(score);
      localStorage.setItem('snakeScore', `${score}`);
    }
  }, [maxScore, score]);

  return (
    <Box flex={4} p={2} minHeight={'calc(100vh - 97px)'}>
      <center>
        <Box sx={{
          display: 'flex',
          maxWidth: '500px',
          width: (`calc(${box*columns}px)`),
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'space-between'
        }}>

          <Link to={'/projects'} sx={{}}>
            <Box sx={{ padding: '15px' }} >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <ArrowBack />
              </ListItemIcon>
            </Box>
          </Link>

          <Typography variant='h5' >
            {'Snake game'}
          </Typography>

          <Box sx={{ padding: '15px' }}>
            <QuestionMark />
          </Box>
        </Box>

        <Box sx={{
          maxWidth: '500px',
          width: (`calc(${box*columns}px)`),
          textAlign: 'left'
        }}>
          <ListItemText primary={`Score: ${score}`} />
          <ListItemText primary={`Max score: ${maxScore}`} />
        </Box>

        <canvas
          ref={canvasRef}
          width={box*columns}
          height={box*rows}
          style={{ border: '1px solid #3d444d' }}
        />
        {/*{snake.map((item, index) => (*/}
        {/*  <div key={index}>*/}
        {/*    {`x: ${item.x} y: ${item.y}`}*/}
        {/*  </div>*/}
        {/*))}*/}
      </center>
    </Box>
  );
}
