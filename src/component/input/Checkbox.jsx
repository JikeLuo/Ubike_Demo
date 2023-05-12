import styled from "styled-components";
import check from '../../asset/img/check.png'
import { useEffect, useState } from "react";


const Checkbox = styled.div`
> .checkboxes {
    display: flex;
    flex-wrap: wrap;
}
`

const CheckboxesOne = styled.div`
    position: relative;
    user-select: none;
    display: flex;
    align-items: center;
    height: 20px;
    margin: 8px 15px;
    font-size: 18px;
    .check-box {
        position: relative;
        width: 20px;
        height: 20px;
        background-color: ${({ selected }) => selected ? '#B5CC22' : 'white'};
        border: 1px solid #AEAEAE;
        border-radius: 4px;
        margin-right: 6px;
        cursor: pointer;
        > img {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 60%;
            transform: translateX(-50%) translateY(-50%); 
        }
    }
`

const Check = (
    {
        selected,
        area,
        setArea,
        setSelectedArea = () => { },
    }) => {

    const [isAll, setIsAll] = useState(true)
    const chooseArea = (chosen) => {
        setArea((prev) => {
            const temp = prev.map((area) => area.cn === chosen
                ? { ...area, selected: !area.selected }
                : area
            )
            if (temp.some((area) => {
                return area.selected === false
            })) setIsAll(false)
            else setIsAll(true)
            return temp
        })

    }

    useEffect(()=> {
        if (area.length === 0) return
        setSelectedArea(() => {
            let set = area.map(ele => {
                if (ele.selected) return ele.cn
            })
            .filter((item) => item !== undefined)
            return new Set([...set])
        })
    }, [area])

    const chooseAll = () => {
        setArea((prev) => {
            return prev.map(area => ({ ...area, selected: !isAll }))
        })
        setIsAll((prev) => !prev)
    }

    return (
        <Checkbox selected={selected}>
            <div className="select-all">
                <CheckboxesOne
                    selected={isAll}
                    onClick={chooseAll}
                >
                    <div className="check-box">
                        <img src={check} alt="check" />
                    </div>
                    <div>全選</div>
                </CheckboxesOne>
            </div>
            <div className="checkboxes">
                {area.map((item) => (
                    <CheckboxesOne
                        key={item.cn}
                        selected={item.selected}
                        onClick={() => chooseArea(item.cn)}
                    >
                        <div className="check-box">
                            <img src={check} alt="check" />
                        </div>
                        <div>{item.cn}</div>
                    </CheckboxesOne>
                ))}
            </div>
        </Checkbox>
    );
}

export default Check;