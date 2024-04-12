import {Button, Flex, Typography, notification} from 'antd';
import {RandomNumbersIcon} from '../../assets/icons';
import {Field, Steps} from '../../assets/UI';
import {useEffect, useState} from 'react';

const Desk = () => {
  //
  const [api, contextHolder] = notification.useNotification();
  //
  const [selectFieldsOne, setSelectFieldsOne] = useState<number[]>([]);
  const [selectFieldsTwo, setSelectFieldsTwo] = useState<number[]>([]);
  //
  const [autoOne, setAutoOne] = useState<number[]>([]);
  const [autoTwo, setAutoTwo] = useState<number[]>([]);
  //
  const [loading, setLoading] = useState(false);
  //
  const generateRandomNumbers = (maxValue: number, count: number) => {
    const randomNumbers: number[] = [];
    while (randomNumbers.length < count) {
      const randomNumber = Math.floor(Math.random() * maxValue) + 1;
      //
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }
    return randomNumbers;
  };
  //
  const intersection = (selectArray: number[], autoArray: number[]) => {
    const setA = new Set(selectArray);
    return autoArray.filter(value => setA.has(value));
  };
  //
  const sentSelectedNumbers = async (
    selectedNumbers: number[],
    win: boolean,
  ) => {
    const url = 'https://example.com/fake-url';
    const body = {
      selectedNumber: selectedNumbers,
      isTicketWon: win,
    };

    try {
      setLoading(true);
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      setLoading(false);

      if (response.status === 200) {
        api.success({
          message: 'Данные успешно отправлены',
        });
        return true;
      } else {
        let attemptsLeft = 2;
        while (attemptsLeft > 0) {
          await new Promise(resolve => setTimeout(resolve, 2000));
          response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });

          if (response.status === 200) {
            api.success({
              message: 'Данные успешно отправлены',
            });
            return true;
          }

          attemptsLeft--;
        }

        api.error({
          message: 'Не удалось отправить данные',
        });
        return false;
      }
    } catch (error) {
      setLoading(false);
      console.error('Произошла ошибка при отправке:', error);
      return false;
    }
  };
  //
  const checkWin = () => {
    const winArrayOne = intersection(selectFieldsOne, autoOne);
    const winArrayTwo = intersection(selectFieldsTwo, autoTwo);

    if (winArrayOne.length >= 4) {
      api.success({
        message: 'Вы победили',
        description: `У вас совпали ${winArrayOne.length} цифр`,
      });
      sentSelectedNumbers(selectFieldsOne.concat(selectFieldsTwo), true);
      return;
    }
    if (winArrayOne.length >= 3 && winArrayTwo.length === 1) {
      api.success({
        message: 'Вы победили',
        description: `У вас совпали ${
          winArrayOne.length + winArrayTwo.length
        } цифр`,
      });
      sentSelectedNumbers(selectFieldsOne.concat(selectFieldsTwo), true);
      return;
    }
    sentSelectedNumbers(selectFieldsOne.concat(selectFieldsTwo), false);
    api.error({
      message: 'Вы Проиграли',
      description: `У вас совпали только ${
        winArrayOne.length + winArrayTwo.length
      } цифр`,
    });
  };
  //

  //
  useEffect(() => {
    const randomAutoOne = generateRandomNumbers(19, 8);
    const randomAutoTwo = generateRandomNumbers(2, 1);
    setAutoOne(randomAutoOne);
    setAutoTwo(randomAutoTwo);
  }, []);
  //
  return (
    <>
      {contextHolder}
      <Flex vertical className='desk-wrapper' justify='center'>
        <Flex justify='space-between' align='center' className='desc-title'>
          <Typography.Title level={4}>{'Билет 1'}</Typography.Title>
          <Button
            onClick={() => {
              const randomOne = generateRandomNumbers(19, 8);
              const randomTwo = generateRandomNumbers(2, 1);
              setSelectFieldsOne(randomOne);
              setSelectFieldsTwo(randomTwo);
            }}
            type='text'
            icon={<RandomNumbersIcon />}
          />
        </Flex>
        <Steps stepLength={8} selectItems={selectFieldsOne} />
        <Field
          disabled={selectFieldsOne.length === 8}
          selectItems={selectFieldsOne}
          setSelectItem={setSelectFieldsOne}
          fildLength={19}
        />
        <Steps stepLength={1} selectItems={selectFieldsTwo} />
        <Field
          disabled={selectFieldsTwo.length === 1}
          selectItems={selectFieldsTwo}
          setSelectItem={setSelectFieldsTwo}
          fildLength={2}
        />
        <Button
          loading={loading}
          disabled={
            selectFieldsOne.length < 8 || selectFieldsTwo.length < 1
              ? true
              : false
          }
          onClick={() => {
            checkWin();
          }}>
          {'Показать результат'}
        </Button>
      </Flex>
    </>
  );
};

export default Desk;
