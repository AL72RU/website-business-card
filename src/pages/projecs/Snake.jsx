import React, { useEffect, useRef, useState } from 'react';
import { Box, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { ArrowBack, Gesture, QuestionMark } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const box = 46;
const rows = 11;
const columns = 7;
const snakeStep = 1;
const speedGame = 1;
const foodRadius = Math.round(box/100*90/2);
const foodColor = '#FF0000';
const snakeWidth = Math.round(box/100*90);
const snakeColor = '#5cef05';

export default function Snake() {
  const canvasRef = useRef();
  const [score, setScore] = useState(0);
  const [food, setFood] = useState({ x: 3, y: 5 });
  const [snake, setSnake] = useState([{ x: box/2+box*(3), y: box/2+box*(9) }]);
  const [direction, setDirection] = useState('up');
  const [skipSteps, setSkipSteps] = useState(box);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'ArrowRight':
          setDirection(prevState => {
            if (prevState !== 'left') {
              return 'right';
            }
          });
          break;
        case 'ArrowLeft':
          setDirection(prevState => {
            if (prevState !== 'right') {
              return 'left';
            }
          });
          break;
        case 'ArrowUp':
          setDirection(prevState => {
            if (prevState !== 'down') {
              return 'up';
            }});
          break;
        case 'ArrowDown':
          setDirection(prevState => {
            if (prevState !== 'up') {
              return 'down';
            }});
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyPress);

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
      ctx.beginPath();
      ctx.lineWidth = snakeWidth;
      ctx.strokeStyle = snakeColor;
      ctx.lineCap = 'round';
      for (let i = 0; i < snake.length; i++) {
        if (i) {
          ctx.lineTo(snake[i].x, snake[i].y);
        } else {
          ctx.moveTo(snake[i].x, snake[i].y);
          if (snake.length === 1) {
            ctx.lineTo(snake[i].x, snake[i].y);
          }
        }
      }
      ctx.stroke();
    };

    function eatTail(head, arr) {
      for (let i = 0; i < arr.length; i++) {
        if (head.x === arr[i].x && head.y === arr[i].y) {
          clearInterval(game);
        }
      }
    }

    // ============================================================================

    const drawGame = () => {
      ctx.clearRect(0, 0, box*columns, box*rows);
      drawBack();
      drawFood();
      drawSnake();

      const newSnake = [...snake];
      const snakeHead = { x: newSnake[0].x, y: newSnake[0].y };
      let snakeX = snakeHead.x;
      let snakeY = snakeHead.y;

      if (snakeX === box/2+box*(food.x) && snakeY === box/2+box*(food.y)) {
        setScore(prevState => prevState+1);
        setFood({
          x: Math.floor(Math.random() * (columns)),
          y: Math.floor(Math.random() * (rows))
        });
        setSkipSteps(box);
      } else {
        if (skipSteps) {
          setSkipSteps(prevState => prevState - 1);
        } else {
          // удаляет последний элемент в массиве
          // snake.pop();
          setSnake(prevState => prevState.filter((item, index) => index !== prevState.length-1 ));
        }
      }

      if (direction === 'left') {snakeX -= snakeStep;}
      if (direction === 'right') {snakeX += snakeStep;}
      if (direction === 'up') {snakeY -= snakeStep;}
      if (direction === 'down') {snakeY += snakeStep;}
      let newHead = {
        x: snakeX,
        y: snakeY
      };

      if (snakeX < box/2 || snakeX > box*columns-box/2
        || snakeY < box/2 || snakeY > box*rows-box/2)
      {
        // setDirection('up');
        // setFood({ x: 3, y: 5 });
        // setScore(0);
        // //   { x: box/2+box*(3), y: box/2+box*(7) },
        // setSnake(() => {
        //   const newSnake = [{ x: box/2+box*(3), y: box/2+box*(7) }];
        //   return newSnake;
        // });
        clearInterval(game);
      }

      eatTail(newHead, snake);

      // добавляет елемент в начало массива
      // snake.unshift(newHead);
      setSnake(prevState => {
        const newSnake = [newHead, ...prevState];
        return newSnake;
      });
    };
    const game = setInterval(drawGame, speedGame);


/*

    const moveSnake = () => {
      if (direction) {
        const newSnake = [...snake];
        const snakeHead = { x: newSnake[0].x, y: newSnake[0].y };

        switch (direction) {
          case 'right':
            snakeHead.x += snakeStep;
            break;
          case 'left':
            snakeHead.x -= snakeStep;
            break;
          case 'up':
            snakeHead.y -= snakeStep;
            break;
          case 'down':
            snakeHead.y += snakeStep;
            break;
          default:
            break;
        }

        // eatFood(snakeHead);
        // collision(snakeHead);
        // setSnake((prevState) => {
        //   const newSnake = [snakeHead, ...prevState];
        //
        //   return newSnake;
        // });
      }
    };

    const collision = (snakeHead) => {
      if (snakeHead.x + snakeStep >= box*columns-box/2 || snakeHead.x + snakeStep <= 0+box/2
        || snakeHead.y + snakeStep >= box*rows-box/2 || snakeHead.y + snakeStep <= 0+box/2) {


        setDirection('up');
        setFood({ x: 3, y: 5 });
        setScore(0);
        //   { x: box/2+box*(3), y: box/2+box*(7) },
        setSnake(prevState => {
          const newSnake = [{ x: 100, y: 300 }];
          return prevState;
        });

      }
    };

    const eatFood = (head) => {
      const snakeHead = head;

      if (snakeHead.x === box/2+box*(food.x) && snakeHead.y === box/2+box*(food.y)) {
        setScore(prevState => prevState+1);

        setFood({
          x: Math.floor(Math.random() * (columns)),
          y: Math.floor(Math.random() * (rows))
        });

        // добавить количество пропусков для отмены удаления последнего элемента
        setSkipSteps(prevState => prevState+box);
      } else {
        if (skipSteps) {
          setSkipSteps(prevState => prevState-1);
        } else {
          setSnake((prevState) => {
            const newSnake = prevState.filter((item, index) => index !== prevState.length-1);
            return newSnake;
          });
        }
      }
    };

*/

    return () => {
      clearInterval(game);
    };
  }, [snake, food.x, food.y, direction, skipSteps]);

  useEffect(() => {
    // function eatTail() {
    //   for (let i = 1; i < snake.length; i++) {
    //     if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
    //       return true;
    //     }
    //   }
    //   return false;
    // }

    if (snake[0].x < box/2 || snake[0].x > box*columns-box/2
      || snake[0].y < box/2 || snake[0].y > box*rows-box/2 /*|| eatTail()*/)
    {
      setSnake([{ x: box/2+box*(3), y: box/2+box*(9) }]);
      setSkipSteps(box);
      setFood({ x: 3, y: 5 });
      setScore(0);
    }
  }, [snake]);

  return (
    <Box flex={4} p={2} minHeight={'calc(100vh - 97px)'}>
      <center>
        <Box sx={{
          display: 'flex',
          maxWidth: '500px',
          width: (`calc(${box*columns}px)`),
          marginBottom: '20px',
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

        <ListItemText primary={`Score: ${score} [ ${snake.length} ]`} />
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
