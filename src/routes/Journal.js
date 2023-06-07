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
        const { prevLastDate, prevLastDay } = calculatePrevDate();
        const { currentLastDate, currentLastDay } = calculateLastDate();

        const list = Array(6).fill().map(() => Array(7).fill([0, true]));

        let index = 0;
        let date = prevLastDate - prevLastDay;

        // fill out dates of prev month
        for (index; date <= prevLastDate; index++) {
            const row = Math.floor(index / 7);
            const col = index % 7;
            list[row][col] = [date, false];
            date++;
        }
        // fill out dates of this month
        date = 1;
        for (index; index < 42 && date <= currentLastDate; index++) {
            const row = Math.floor(index / 7);
            const col = index % 7;
            list[row][col] = [date, true];
            date++;
        }
        // fill out dates of next month
        date = 1;
        for (index; index < 42; index++) {
            const row = Math.floor(index / 7);
            const col = index % 7;
            list[row][col] = [date, false];
            date++;
        }

        console.log(list);
        return list;
    };



    const onPrevMonthButtonClick = () => {
        if (currentMonth - 1 == 0) {
            setCurrentMonth(12);
            setCurrentYear(prev => prev - 1);
        } else {
            setCurrentMonth(prev => prev - 1)
        }
    }

    const onNextMonthButtonClick = () => {
        if (currentMonth + 1 == 13) {
            setCurrentMonth(1);
            setCurrentYear(prev => prev + 1);
        } else {
            setCurrentMonth(prev => prev + 1)
        }
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h3 style={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant='outline-secondary'
                            className='me-3'
                            onClick={onPrevMonthButtonClick}>{"<"}
                        </Button>
                        {currentYear}년 {currentMonth}월
                        <Button
                            variant='outline-secondary'
                            className='ms-3'
                            onClick={onNextMonthButtonClick}>{">"}
                        </Button>
                    </h3>
                </Col>
            </Row>
            <Row>
                <Col lg={{span:10, offset:1}} xl={{span:10, offset:1}} xxl={{span:8, offset:2}}>
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
                                            style={{ color: date[1] === true ? "gray" : "lightGray" }}>
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