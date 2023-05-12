import React, { useEffect, useRef, useState } from "react";
import useClosePopup from "../../hooks/useClosePopup";
import styled from "styled-components";
import bike from '../../asset/img/Frame.png'
import searchIcon from '../../asset/img/search.png'
import tri from '../../asset/img/tri.png'
import Checkbox from './Checkbox'



const Main = styled.div`
    display: flex;
    width: 100%;
`
const Left = styled.div`
width: ${({ matches }) => matches ? '100%' : '40%'};
    height: 100%;
    > .checkbox {
        margin-top: 5%;
        > .select-all {
            width: 100%;    
        }
    }
`
const InputContainer = styled.div`
    ${({ matches }) => matches ? '' : 'display: flex;'}
    ${({ matches }) => matches ? '' : 'position: relative;'}
    width: 100%;
`

const SelectCity = styled.div`
    width: 100%;
    position: relative;
    margin-right: 3%;
    margin-bottom: 3%;
`
const Select = styled.div`
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #F6F6F6;
    border-radius: 8px;
    padding: 0 3%;
    cursor: pointer;
    userSelect: none;
    input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        background-color: transparent;
    }
    img {
        position: absolute;
        right: 5%;
        top: 50%;
        transform: translateY(-50%);
    }

`
const SelectBox = styled.div`
    position: absolute;
    width: 100%;

    z-index: 1;
    top: 120%;
    display:${({ open }) => open ? 'flex' : 'none'};
    flex-direction: column;
    
    background: #F6F6F6;
    border-radius: 8px;
    > .option {
        cursor: pointer;
        font-size: 18px;
        line-height: 20px;
        font-size: 18px;
        padding: 10px 20px;
        &:hover {
            font-weight: bold;
        }
    }    
`

const Right = styled.div`
    position: relative;
    height: 60vh;
    width: 60vw;
    > img {
       position: absolute;
       bottom: 0;
       left: 0;
       width: 100%;
       padding: 0 20%;
    }
`

const Input = React.memo((
    {
        data = {},
        matches = false,
        selected = '',
        setSelected = () => { },
        setSelectedArea = () => { },
        setSearchData = () => { },

    }) => {
    const [city, setCity] = useState([])
    const [area, setArea] = useState([])
    const [open, setOpen] = useState(false)
    const inputRef = useRef(null)

    useClosePopup(open, () => setOpen(false))

    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            setCity(Object.keys(data))
        }
    }, [data])

    useEffect(() => {
        if (!!selected && Object.keys(data).length !== 0) {
            setArea([])
            Object.keys(data[selected]).forEach(item => {
                setArea((prev) => ([
                    ...prev,
                    {
                        en: data[selected][item][0]?.sno,
                        cn: item,
                        selected: true,
                    }
                ]))
            })
        }
    }, [data, selected])

    const chooseCity = (city) => {
        setSelected(city)
    }

    const search = (e) => {
        setSearchData({})
        if (!inputRef.current.value) return
        const input = new RegExp(inputRef.current.value)

        Object.keys(data).forEach((city) => {
            Object.keys(data[city]).forEach((area) => {
                data[city][area].forEach((sta) => {
                    if (input.test(sta.ar)) {
                        setSearchData((prev) => {
                            if (!(city in prev)) prev[city] = {}
                            if (!(area in prev[city])) prev[city][area] = []

                            return {
                                ...prev,
                                [city]: {
                                    ...prev[city],
                                    [area]: [
                                        ...prev[city][area],
                                        sta,
                                    ],
                                },
                            }
                        })
                    }
                })

            })
        })
    }



    return (
        <Main matches={matches}>
            <Left matches={matches}>

                <h1>站點資訊</h1>
                <InputContainer matches={matches}>
                    <SelectCity>
                        <Select
                            matches={matches}
                            onClick={() => setOpen(true)}
                        >
                            {!!selected ? selected : '選擇城市'}
                            <img
                                src={tri}
                                className='img'
                                alt='tri'
                            />
                        </Select>

                        <SelectBox open={open}>
                            {city.map((city) => (
                                <div
                                    key={city}
                                    className="option"
                                    onClick={() => chooseCity(city)}
                                >
                                    {city}
                                </div>
                            ))}
                        </SelectBox>
                    </SelectCity>

                    <Select matches={matches}>
                        <input
                            type="text"
                            placeholder="搜尋站點"
                            ref={inputRef}
                            onChange={search}
                            onKeyDown={(e) => e.code === 'Enter' && search()}
                        />
                        <img
                            className="img"
                            src={searchIcon}
                            alt="search-icon"
                            onClick={search}
                        />
                    </Select>
                </InputContainer>

                <Checkbox
                    selected={selected}
                    area={area}
                    setArea={setArea}
                    setSelectedArea={setSelectedArea}
                />


            </Left>

            {!matches
                && <Right>
                    <img src={bike} alt="bike" />
                </Right>}
        </Main>
    );
})

export default Input;