import { useState } from 'react';
import { Container, Row, Col, Table, ListGroup, Button } from 'react-bootstrap'
import 'styles/journal/journal.css'

const Journal = () => {

    const [currentYear, setCurrentYear] = useState(2023);
    const [currentMonth, setCurrentMonth] = useState(3);
    const [currentDate, setCurrentDate] = useState(1);

    const calculatePrevDate = () => {
        var prev = new Date(currentYear, currentMonth - 1, 0);
        var prevLastDate = prev.getDate();
        var prevLastDay = prev.getDay();
        return ({ prevLastDate, prevLastDay })
    }

    const calculateLastDate = () => {
        var current = new Date(currentYear, currentMonth, 0);
        var currentLastDate = current.getDate();
        var currentLastDay = current.getDay();
        return ({ currentLastDate, currentLastDay })
    }

    const makeCalendar = () => {
        var { prevLastDate, prevLastDay } = calculatePrevDate();
        var { currentLastDate, currentLastDay } = calculateLastDate();
        // list -> [행][열][0] : 날짜, [행][열][1]: 이번 달 날짜인지(bool)
        var list = Array(6).fill([0, true]).map(() => Array(7).fill([0, true]));

        for (let i = 0; i < 7; i++) {
            var date = prevLastDate - (prevLastDay - i);
            if (date > prevLastDate) {
                list[0][i] = [-(prevLastDay - i), true];
            } else {
                // 저번 달 날짜
                list[0][i] = [prevLastDate - (prevLastDay - i), false];
            }
        }
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 7; j++) {
                if (list[0][6][0] === prevLastDate) {
                    list[i + 1][j] = [0 + i * 7 + j + 1, true];
                } else {
                    list[i + 1][j] = [list[0][6][0] + i * 7 + j + 1, true];
                }
            }
        }
        for (let i = 0; i < 7; i++) {
            var date = currentLastDate - (currentLastDay - i);
            if (date > currentLastDate) {
                //다음 달 날짜
                list[5][i] = [-(currentLastDay - i), false];
            } else {
                list[5][i] = [currentLastDate - (currentLastDay - i), true];
            }
        }
        console.log(list);
        return list;
    }

    const onPrevMonthButtonClick = () => {
        
        if (currentMonth-1 == 0) {
            setCurrentMonth(12);
            setCurrentYear(prev=>prev-1);
        } else {
            setCurrentMonth(prev=>prev-1)
        }


    }

    const onNextMonthButtonClick = () => {
        if (currentMonth+1 == 13) {
            setCurrentMonth(1);
            setCurrentYear(prev=>prev+1);
        } else {
            setCurrentMonth(prev=>prev+1)
        }
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                
                    <h3 style={{display:"flex", justifyContent:"center"}}>
                    <Button onClick={onPrevMonthButtonClick}>{"<"}</Button>
                        {currentYear}년 {currentMonth}월
                        <Button onClick={onNextMonthButtonClick}>{">"}</Button>
                    </h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table bordered className='calendar'>
                        <thead>
                            <tr>
                                <th style={{ color: "red" }} onClick={makeCalendar}>일</th>
                                <th >월</th>
                                <th>화</th>
                                <th>수</th>
                                <th>목</th>
                                <th>금</th>
                                <th style={{ color: "blue" }}>토</th>
                            </tr>
                        </thead>
                        <tbody>
                            {makeCalendar().map((week, weekIndex) => (
                                <tr key={weekIndex}>
                                    {week.map((date, dateIndex) => (
                                        <td
                                            key={dateIndex}
                                            className='hoverable-cell'
                                            style={{ color: date[1] === true ? "black" : "lightGray" }}>
                                            {date[0]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Journal;