import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { constans } from "../../values";
import styled from "styled-components";
import { Button, Modal2 } from "components";
import { useLogout } from "hooks/useAuth";

const DashboardDropDownWithIcon = ({ icon, data, onItemClick }) => {
	const [isActived, setIsActicved] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { mutate: logout } = useLogout();
	const onOpenDropDown = () => {
		setIsActicved((prev) => !prev);
	};
	return (
		<Container>
			<IconContainer onClick={onOpenDropDown}>
				<span>{data}</span>
				<Selected>
					<i className='fa-regular fa-circle-user'></i>
				</Selected>
			</IconContainer>
			<Options heyt={isActived}>
				{/* if user was passanger */}
				{JSON.parse(Cookies.get(constans.INFO)).types[0].pivot.user_type_id === 1 && (
					<>
						<li>
							<Link to='/dashboard'>Dashboard</Link>
						</li>
						<li>
							<Button
								className='w-100'
								onClick={() => {
									setIsModalOpen(true);
									setIsActicved(false);
								}}
							>
								Log Out
							</Button>
							<Modal2
								className='login-modal'
								isOpen={isModalOpen}
								disableBackdropClose={true}
								onClose={() => setIsModalOpen(false)}
								title='Logout'
							>
								<span className='text-center w-100'>
									Are you sure you want to sign out?
								</span>
								<div
									className='mt-3'
									style={{
										display: "flex",
										alignItems: "center",
										gap: "5px",
									}}
								>
									<button className='small-btn-main' onClick={logout}>
										Log out
									</button>
									<button
										className='seconadry-small-btn-main'
										// style={{ backgroundColor: "#6a6a71" }}
										onClick={() => setIsModalOpen(false)}
									>
										No Keep me sign in!
									</button>
								</div>
							</Modal2>
						</li>
					</>
				)}
				{/* if user was owner */}
				{JSON.parse(Cookies.get(constans.INFO)).types[0].pivot.user_type_id === 2 && (
					<>
						<li>
							<Link to='/dashboard'>Dashboard</Link>
						</li>
						<li>
							<Link to='/dashboard/settings'>Setting</Link>
						</li>
						<li>
							<Link to='/dashboard/reserves'>Reservations</Link>
						</li>
						<li>
							<Button
								className='w-100'
								onClick={() => {
									setIsModalOpen(true);
									setIsActicved(false);
								}}
							>
								Log Out
							</Button>
							<Modal2
								className='login-modal'
								isOpen={isModalOpen}
								disableBackdropClose={true}
								onClose={() => setIsModalOpen(false)}
								title='Logout'
							>
								<span className='text-center w-100'>
									Are you sure you want to sign out?
								</span>
								<div
									className='mt-3'
									style={{
										display: "flex",
										alignItems: "center",
										gap: "5px",
									}}
								>
									<button className='small-btn-main' onClick={logout}>
										Log out
									</button>
									<button
										className='seconadry-small-btn-main'
										// style={{ backgroundColor: "#6a6a71" }}
										onClick={() => setIsModalOpen(false)}
									>
										No Keep me sign in!
									</button>
								</div>
							</Modal2>
						</li>
					</>
				)}
				{/* if user was Admin */}
				{JSON.parse(Cookies.get(constans.INFO)).types[0].pivot.user_type_id === 4 && (
					<>
						<li>
							<Link to='/dashboard'>Dashboard</Link>
						</li>
						<li>
							<Link to='/dashboard/settings'>Users</Link>
						</li>
						<li>
							<Link to='/dashboard/reserves'>Reservations</Link>
						</li>
						<li>
							<Button
								className='w-100'
								onClick={() => {
									setIsModalOpen(true);
									setIsActicved(false);
								}}
							>
								Log Out
							</Button>
							<Modal2
								className='login-modal'
								isOpen={isModalOpen}
								disableBackdropClose={true}
								onClose={() => setIsModalOpen(false)}
								title='Logout'
							>
								<span className='text-center w-100'>
									Are you sure you want to sign out?
								</span>
								<div
									className='mt-3'
									style={{
										display: "flex",
										alignItems: "center",
										gap: "5px",
									}}
								>
									<button className='small-btn-main' onClick={logout}>
										Log out
									</button>
									<button
										className='seconadry-small-btn-main'
										// style={{ backgroundColor: "#6a6a71" }}
										onClick={() => setIsModalOpen(false)}
									>
										No Keep me sign in!
									</button>
								</div>
							</Modal2>
						</li>
					</>
				)}
			</Options>
		</Container>
	);
};

const IconContainer = styled.section`
	display: flex;
	color: #333;
	align-items: center;
	gap: 10px;
	cursor: pointer;
`;
const Container = styled.section`
	display: flex;
	flex-direction: column;
	@media (min-width: 991px) {
		position: relative;
	}
	color: #333;
`;

const Selected = styled.div`
	border-radius: 8px;
	i {
		font-size: 1.7rem;
	}
`;

const Options = styled.ul`
	transform: ${(props) => (props.heyt ? "scaleY(1)" : "scaleY(0)")};
	transform-origin: top center;
	transition: all 200ms ease-in-out;
	background-color: #fff;
	border-radius: 24px;
	display: flex;
	position: absolute;
	left: 0;
	right: 0;
	padding: 0.7rem !important;
	flex-direction: column;
	margin-top: 4px !important;
	border: 1px solid rgba(0, 0, 0, 0.5);
	top: calc(100% + 16px);
	box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.12);
	@media (min-width: 991px) {
		width: 200px;
		right: unset;
		left: 0;
		top: 61px;
	}
	li {
		list-style-type: none;
		margin: 4px 0 !important;
		width: 100%;
		a {
			text-decoration: none;
			color: #5d5d5d;
			padding: 0 8px;
		}
	}
`;
export default DashboardDropDownWithIcon;
