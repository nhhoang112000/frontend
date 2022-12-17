import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import learnItLogo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'

const NavbarMenu = () => {
	const {
		authState: {
			user: { username }
		},
		logoutUser
	} = useContext(AuthContext)

	const logout = () => logoutUser()

	return (
		<Navbar  expand='lg' bg='dark' variant='dark' className='shadow'>
			<Navbar.Brand className='font-weight-bolder text-white pe-2 ps-3'>
				<img
					src={learnItLogo}
					alt='logo'
					width='32'
					height='32'
					className='me-2'
				/>
				RECOURSES
			</Navbar.Brand>

			<Navbar.Toggle aria-controls='basic-navbar-nav' />

			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto'>
					<Nav.Link
						className='font-weight-bolder text-white'
						to='/dashboard'
						as={Link}
					>
						Dashboard
					</Nav.Link>
					<Nav.Link
						className='font-weight-bolder text-white'
						to='/forum'
						as={Link}
					>
						Forum
					</Nav.Link>
				</Nav>

				<Nav className="justify-content-end flex-grow-1 pe-3">
					<Nav.Link className='font-weight-bolder text-white me-3' disabled>
					    {username}
					</Nav.Link>
					<Button
						variant="warning"
						className='font-weight-bolder text-white'
						onClick={logout}
					>
						<img
							src={logoutIcon}
							alt='logoutIcon'
							width='32'
							height='32'
							className='mr-2'
						/>
						Logout
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default NavbarMenu
