import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import UBikeLogo from '../../asset/img/logo_180x180 1.png'
import X from '../../asset/img/X.png'
import bar from '../../asset/img/bar.png'

const Main = styled.div`
    padding: 0 5%;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: ${({ isMatches }) => isMatches ? '107' : '72'}px;
    border-bottom: 1px solid #EBEBEB;
`
const NavSelect = styled.div`
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: ${({ isMatches }) => isMatches ? 'column' : 'row'};  
    ${({ isMatches }) => isMatches ? '' : 'align-items: center;'}
    ${({ isMatches }) => isMatches ? 'padding: 0 35px;' : ''}
    position: ${({ isMatches }) => isMatches ? 'absolute' : 'relative'};   
    width: 100%;
    height: ${({ isMatches }) => isMatches ? 'calc(100% - 72px)' : '100%'};
    ${({ open, isMatches }) => (isMatches && open) ? 'transform: translateX(100%);' : ''}
    background-color: ${({ isMatches }) => isMatches ? '#B5CC22' : 'white'};
    transition: 0.2s ease-out;
    .link {
        ${({ isMatches }) => isMatches ? '' : 'padding: 0 35px;'}
        width: ${({ isMatches }) => isMatches ? '100%' : 'auto'};
        height: ${({ isMatches }) => isMatches ? '72px' : 'auto'};
        display: ${({ isMatches }) => isMatches ? 'flex' : 'block'};
        align-items: end;
        color: ${({ isMatches }) => isMatches ? 'white' : '#677510'};
        text-decoration: none;
        font-weight: bold;
        &:hover {
            color: ${({ isMatches }) => isMatches ? '#677510' : '#B5CC22'};
        }
    }`

const Img = styled.img`
    height: 100%;`
const Icon = styled.img`
    height: 15px;`

const Button = styled.button`
    margin: ${({ isMatches }) => isMatches ? 'auto 0' : '0'};
    ${({ isMatches }) => isMatches ? 'margin-top: auto;' : ''}
    border: none;
    width: 80px;
    height: 40px;
    color: ${({ isMatches }) => isMatches ? '#B5CC22' : 'white'};
    border-radius: 20px;
    background-color: ${({ isMatches }) => isMatches ? 'white' : '#B5CC22'};`

const Navbar = ({matches}) => {
    const [open, setOpen] = useState(true)

    const openBar = () => {
        setOpen(prev => !prev)
    }

    const Select = () => (
        <NavSelect isMatches={matches} open={open}>
            <NavLink className={'link'} to="/introduce" >使用說明</NavLink>
            <NavLink className={'link'} to="/payment" >收費方式</NavLink>
            <NavLink className={'link'} to="/information" >站點資訊</NavLink>
            <NavLink className={'link'} to="/news" >最新消息</NavLink>
            <NavLink className={'link'} to="/activity" >活動專區</NavLink>
            {matches && <Button isMatches={matches}>登入</Button>}
        </NavSelect>
    )

    return (
        <>
            <Main>
                <Img src={UBikeLogo} alt="" />
                {!matches && <Select />}
                {matches
                    ? open
                        ? <Icon src={bar} onClick={openBar} />
                        : <Icon src={X} onClick={openBar} />
                    : <Button isMatches={matches}>登入</Button>
                }
            </Main>
            {matches && <Select />}
        </>
    );
}

export default Navbar;