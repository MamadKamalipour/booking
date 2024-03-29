import { Button, Counter, LoginModal, Modal } from "components";
import { useAuth } from "hooks/useAuth";
import { useReserveUnits } from "hooks/useReservaion";
import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "./index.scss";

const UnitCard = ({ data, buttonOnClick }) => {
	const { name, adults_sleeps_count, bedrooms_count, description, id, kids_sleeps_count, price } =
		data;
	const [active, setIsActive] = useState(false);
	const { mutate: reserveMutate } = useReserveUnits();
	const { isUserLoggedIn } = useAuth();
	const [adult, setAdult] = useState(1);
	const [checkIn, setCheckIn] = useState(new DateObject());
	const [checkOut, setCheckOut] = useState();
	const [specialRequests, setSpecialRequests] = useState("");
	const [children, setChildren] = useState(0);

	const reservationHandler = (id) => {
		const data = {
			id,
			formData: {
				check_in_date: checkIn.format("YYYY-MM-DD"),
				check_out_date: checkOut.format("YYYY-MM-DD"),
				adults_count: adult,
				kids_count: children,
				is_for_someone_else: false,
				someone_else_info: {
					first_name: "",
					last_name: "",
					email: "",
				},
				special_requests: specialRequests,
			},
		};
		reserveMutate(data);
	};
	const resetFormHandler = (e) => {
		e.preventDefault();
		setAdult(1);
		setChildren(0);
		setSpecialRequests("");
		setCheckIn(null);
		setCheckOut(null);
	};
	return (
		<main id='unitcard'>
			<div className='unitcard__wrapper'>
				<div className='unitcard'>
					<div className='unitcard__informations'>
						<h5 className='unitcard__informations__title'>{name}</h5>
						<div className='unitcard__informations__icons'>
							<span>
								<i className='fas fa-user'></i>
								Adults
								<small>{adults_sleeps_count}X</small>
							</span>
							<span>
								<i className='fas fa-door-closed'></i>
								Bedrooms
								<small>{bedrooms_count}X</small>
							</span>
							<span>
								<i className='fas fa-child'></i>
								Kids
								<small>{kids_sleeps_count}X</small>
							</span>
						</div>
					</div>
					<div className='unitcard__price'>
						<p>{price}$/Night</p>
						<Modal
							id={`reservation-modal${id}`}
							buttonText='Reserve Now'
							buttonClassnames='btn-main'
							modalTitle={`Reserve ${name}`}
							isCentered={true}
						>
							{isUserLoggedIn ? (
								<>
									<form
										onSubmit={reservationHandler}
										className='reservation-form'
									>
										<div className='reservation-form__wrapper '>
											<button
												className='small-btn-main'
												onClick={resetFormHandler}
											>
												Reset
											</button>
											{/* date */}
											<div className='date-input'>
												<h5>Check In:</h5>
												<DatePicker
													containerClassName='w-100'
													inputClass='form-control'
													format='MMMM DD YYYY'
													minDate={checkIn}
													onChange={(e) => setCheckIn(e)}
													value={checkIn}
												/>
											</div>

											<div className='date-input'>
												<h5>Check Out:</h5>
												<DatePicker
													containerClassName='w-100'
													inputClass='form-control'
													format='MMMM DD YYYY'
													minDate={checkIn}
													onChange={(e) => setCheckOut(e)}
													value={checkOut}
												/>
											</div>

											<div className='w-100'>
												<h5>Adults:</h5>
												<Counter value={adult} onValueChange={setAdult} />
											</div>
											<div className='w-100'>
												<h5>Children:</h5>
												<Counter
													value={children}
													onValueChange={setChildren}
												/>
											</div>
											<textarea
												placeholder='Additional Request'
												className='w-100 form-control'
												value={specialRequests}
												onChange={(e) => setSpecialRequests(e.target.value)}
											/>
										</div>
									</form>
									<Button
										type='submit'
										className='w-100 '
										data-bs-dismiss='modal'
										aria-label='Close'
										onClick={() => reservationHandler(id)}
									>
										Send Reservation Request
									</Button>
								</>
							) : (
								<div className='d-flex justify-content-center align-items-center flex-column'>
									<h5>You need to login to your account before continue</h5>
									<LoginModal iconButton={false} />
								</div>
							)}
						</Modal>
					</div>
					<i
						className={`fas fa-chevron-right openDescription ${active ? "active" : ""}`}
						onClick={() => setIsActive((prev) => !prev)}
					></i>
				</div>
				<div
					className='description'
					style={
						active
							? { height: "100%", opacity: "1", paddingTop: "1rem" }
							: { height: "0px", opacity: "0", paddingTop: "0" }
					}
				>
					<div dangerouslySetInnerHTML={{ __html: description }}></div>
				</div>
			</div>
		</main>
	);
};

export default UnitCard;
