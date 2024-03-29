import React, { useEffect, useState } from "react";
import DashboardLayout from "UserDashboard/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "UserDashboard/examples/Navbars/DashboardNavbar";
import { useGetHotelInvoices } from "hooks/useInvoices";
import { Loader3, Loader2, ReusableTable, FilterTable, Pagination } from "components";
import { useGetProperties } from "hooks/useProperty";
import { useGetUserReservations, useUpdateReservationStatus } from "hooks/useInvoices";
import { invoiceStatus } from "values";
import Select from "react-select";
import Cookies from "js-cookie";
import { constans } from "values";
import { RadioButton } from "components";

function Reserves() {
	const [filterForm, setFilterForm] = useState({
		model_id: "",
		accept_status: "",
		payment_status: "",
	});
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	// pages for pagination
	const [page, setPage] = useState(1);
	// get hotels data with pagonation
	const {
		data: hotelData,
		refetch: refetchHotelReserves,
		isFetching: isHotelReservesFetching,
		isLoading,
	} = useGetHotelInvoices({
		pageParam: page,
		model_id: filterForm.model_id.value,
		accept_status: filterForm.accept_status.value,
		payment_status: filterForm.payment_status,
	});

	// refetch data on pagination change
	useEffect(() => {
		refetchHotelReserves();
	}, [page]);

	// update reservation status
	const { mutate: updateReservationStatus, isLoading: isUpdatingStatus } =
		useUpdateReservationStatus();
	// Accept and rejection functions for owner
	const acceptReserveHandler = (id) => {
		let body = {
			status: "waiting_for_payment",
		};
		updateReservationStatus({ id, body });
	};
	const rejectReserveHandler = (id) => {
		let body = {
			status: "reserve_canceled_by_owner",
		};
		updateReservationStatus({ id, body });
	};

	const resetFilterHandler = () => {
		setFilterForm({ model_id: "", accept_status: "", payment_status: "" });
	};

	// payment status
	const paymentStatus = [
		{
			label: "Paid",
			value: "paid",
		},
		{
			label: "Not Paid",
			value: "not_paid",
		},
	];
	// user Properties
	const { data: properties, isLoading: propertyLoading } = useGetProperties();
	let propertyList = [];
	if (!propertyLoading) {
		properties.data.data.map((item) =>
			propertyList.push({
				label: item.name,
				value: item.id,
			})
		);
	}
	// owner Table
	if (JSON.parse(Cookies.get(constans.INFO)).types[0].pivot.user_type_id === 2) {
		return (
			<DashboardLayout>
				<DashboardNavbar />
				<FilterTable isOpen={isFilterOpen} setIsOpen={setIsFilterOpen}>
					<label className='font-size-1' htmlFor=''>
						Status
					</label>
					<Select
						className='w-100 mb-3'
						options={invoiceStatus}
						value={filterForm.accept_status}
						onChange={(e) => {
							setFilterForm((prev) => {
								return { ...prev, accept_status: e };
							});
							setIsFilterOpen(false);
						}}
					/>
					<label className='font-size-1' htmlFor=''>
						Property
					</label>
					<Select
						className='w-100 mb-3'
						options={propertyList}
						value={filterForm.model_id}
						onChange={(e) => {
							setFilterForm((prev) => {
								return { ...prev, model_id: e };
							});
							setIsFilterOpen(false);
						}}
					/>
					<label className='font-size-1' htmlFor=''>
						Payment Status
					</label>
					<div className='d-flex align-items-center justify-content-between w-100 '>
						<RadioButton
							data={paymentStatus}
							groupName='paymentStatusRadio'
							onChangeValue={(val) => {
								setFilterForm((prev) => {
									return { ...prev, payment_status: val };
								});
								setIsFilterOpen(false);
							}}
						/>
						<button className='small-btn-main' onClick={resetFilterHandler}>
							<i className='fas fa-arrow-rotate-left'></i>
						</button>
					</div>
				</FilterTable>
				{hotelData ? (
					<>
						<ReusableTable
							tableHead={[
								"id",
								"Requested at",
								"Passenger",
								"Property",
								"Date",
								"Passengers Count",
								"status",
								"Actions",
							]}
						>
							{isHotelReservesFetching && <Loader3 />}
							{hotelData?.data.map((item, i) => (
								<tr className='table_body_row' key={i}>
									<td className=' table_body_d'>
										<span>{i + 1}</span>
									</td>
									<td className=' table_body_d'>
										<span>{item.issued_at}</span>
									</td>
									<td className=' table_body_d'>
										<span>
											{item.user.first_name} {item.user.last_name}
										</span>
										<br />
										<span>{item.user.email}</span>
									</td>
									<td className='table_body_d'>
										<span>
											{item.reservable.model_reserved.parent_model.name}
											<br />
											{item.reservable.model_reserved.name}
										</span>
									</td>
									<td className=' table_body_d'>
										<span>{item.reservable.check_in_date}</span>
										<br />
										<span>{item.reservable.check_out_date}</span>
										<br />
										<span>{item.reservable.days_count} Days</span>
									</td>
									<td className=' table_body_d'>
										<span>Adults: {item.reservable.adults_count}</span>
										<br />
										<span>Children: {item.reservable.kids_count}</span>
									</td>
									<td className='table_body_d'>
										<span>
											{
												invoiceStatus.find(
													(st) => st.value === item.reservable.status
												).label
											}
										</span>
									</td>
									<td className=' table_body_d  '>
										<div className='TbuttonsWrapper'>
											{/* accept button */}
											{item.reservable.status === "waiting_for_payment" ? (
												<button
													style={{
														opacity: "0.5",
														cursor: "not-allowed",
													}}
													disabled
													type='button'
													className='action-button accept'
												>
													<i className='fas fa-check'></i>
												</button>
											) : (
												<button
													disabled={isUpdatingStatus ? true : false}
													type='button'
													onClick={(e) => {
														e.preventDefault();
														acceptReserveHandler(item.id);
													}}
													className='action-button accept'
												>
													<i className='fas fa-check'></i>
												</button>
											)}
											{/* reject button */}

											{item.reservable.status ===
											"reserve_canceled_by_owner" ? (
												<button
													style={{
														opacity: "0.5",
														cursor: "not-allowed",
													}}
													disabled
													type='button'
													// onClick={() => rejectReserveHandler(item.id)}
													className='action-button reject'
												>
													<i className='fas fa-close'></i>
												</button>
											) : (
												<button
													disabled={isUpdatingStatus ? true : false}
													type='button'
													onClick={(e) => {
														e.preventDefault();
														rejectReserveHandler(item.id);
													}}
													className='action-button reject'
												>
													<i className='fas fa-close'></i>
												</button>
											)}
										</div>
									</td>
								</tr>
							))}
						</ReusableTable>
						<div className='d-flex justify-content-center pagination'>
							<Pagination
								page={page}
								totalPages={hotelData.last_page}
								onPaginateClick={(page) => {
									setPage(page);
								}}
							/>
						</div>
					</>
				) : (
					<Loader2 />
				)}
			</DashboardLayout>
		);
	}
}

export default Reserves;
