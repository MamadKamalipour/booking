import React from "react";
import image from "assets/image/avatars/7.jpg";
import "./index.scss";
import Modal from "../Modal";
import EditProperty from "UserDashboard/layouts/EditProperty";
import { Link } from "react-router-dom";

const TableItem = ({
	id,
	name,
	address,
	adults_sleeps_count,
	bedrooms_count,
	onEdit,
	onDelete,
	disabledActions,
}) => {
	return (
		<tr className='table_body_row'>
			<td className=' table_body_d'>
				<span>{id}</span>
			</td>
			<td className=' table_body_d'>
				<span>{name}</span>
			</td>
			<td className='table_body_d'>
				<p>{address || adults_sleeps_count}</p>
			</td>
			{bedrooms_count ? (
				<td className='table_body_d'>
					<p>{bedrooms_count}</p>
				</td>
			) : null}
			<td className=' table_body_d  '>
				<TableButtons
					disabledActions={disabledActions}
					onEdit={onEdit}
					onDelete={onDelete}
					id={id}
				/>
			</td>
		</tr>
	);
};
const TableButtons = ({ onEdit, onDelete, id, disabledActions }) => {
	return (
		<div className='TbuttonsWrapper'>
			{/* <button type='button' onClick={onEdit} className='action-button'>
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
					<path d='M497.9 74.16L437.8 14.06c-18.75-18.75-49.19-18.75-67.93 0l-56.53 56.55l127.1 128l56.56-56.55C516.7 123.3 516.7 92.91 497.9 74.16zM290.8 93.23l-259.7 259.7c-2.234 2.234-3.755 5.078-4.376 8.176l-26.34 131.7C-1.921 504 7.95 513.9 19.15 511.7l131.7-26.34c3.098-.6191 5.941-2.141 8.175-4.373l259.7-259.7L290.8 93.23z' />
				</svg>
			</button> */}
			<Link to={`edit/${id}`} className='action-button'>
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
					<path d='M497.9 74.16L437.8 14.06c-18.75-18.75-49.19-18.75-67.93 0l-56.53 56.55l127.1 128l56.56-56.55C516.7 123.3 516.7 92.91 497.9 74.16zM290.8 93.23l-259.7 259.7c-2.234 2.234-3.755 5.078-4.376 8.176l-26.34 131.7C-1.921 504 7.95 513.9 19.15 511.7l131.7-26.34c3.098-.6191 5.941-2.141 8.175-4.373l259.7-259.7L290.8 93.23z' />
				</svg>
			</Link>
			<button
				type='button'
				onClick={onDelete}
				className='action-button'
				disabled={disabledActions}
			>
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
					<path d='M53.21 467c1.562 24.84 23.02 45 47.9 45h245.8c24.88 0 46.33-20.16 47.9-45L416 128H32L53.21 467zM432 32H320l-11.58-23.16c-2.709-5.42-8.25-8.844-14.31-8.844H153.9c-6.061 0-11.6 3.424-14.31 8.844L128 32H16c-8.836 0-16 7.162-16 16V80c0 8.836 7.164 16 16 16h416c8.838 0 16-7.164 16-16V48C448 39.16 440.8 32 432 32z' />
				</svg>
			</button>
		</div>
	);
};
const Table = ({ onEdit, onDelete, data, tableHead, title, disabledActions }) => {
	return (
		<div className='table-responsive'>
			<div className='Table_wrapper'>
				<h3>{title}</h3>
				<table className='cs-table'>
					<thead className='thead'>
						<tr className='thead_row'>
							{tableHead.map((item, i) => (
								<th className='thead_cels' key={i}>
									{item}
								</th>
							))}
						</tr>
					</thead>
					<tbody className='tbody'>
						{data
							? data.map((item, i) => (
									<TableItem
										disabledActions={disabledActions}
										key={i}
										id={item.id}
										name={item.name}
										address={item.address}
										adults_sleeps_count={item.adults_sleeps_count}
										bedrooms_count={item.bedrooms_count}
										beds={item.beds}
										bathrooms={item.bathroom}
										onEdit={() => onEdit(item)}
										onDelete={() => onDelete(item.id)}
									/>
							  ))
							: null}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Table;
