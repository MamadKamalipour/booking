import { useContext } from "react";
import api from "../api";
import { useMutation, useQuery } from "react-query";
import { UserContext } from "../context/UsersContextProvider";
import { Toastify } from "../components";
const useGetGallery = () => {
	return useQuery("getGallery", api.get.getUserGallery, {
		onError: (error, variables, context) => {
			// An error happened!
			Toastify("error", error.response.data.message);
		},
		onSuccess: (data, variables, context) => {
			// Boom baby!
		},
	});
};
const usePostGallery = () => {
	return useMutation(api.post.postUserGallery, {
		onError: (error, variables, context) => {
			// An error happened!
			Toastify("error", error.response.data.message);
		},
		onSuccess: (data, variables, context) => {
			// Boom baby!
			Toastify("success", "Image Added successfully");
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		},
	});
};
const useDeleteGallery = () => {
	const { user, setUser } = useContext(UserContext);
	return useMutation(api.deleteApi.deleteUserGalleryImage, {
		onError: (error, variables, context) => {
			// An error happened!
			Toastify("error", error.response.data.message);
		},
		onSuccess: (data, variables, context) => {
			// Boom baby!
			Toastify("success", "Image Removed successfully");
			window.location.reload();
		},
	});
};
const useUpdateGallery = () => {
	const { user, setUser } = useContext(UserContext);
	return useMutation(api.patch.updateGallery, {
		onError: (error, variables, context) => {
			// An error happened!
			Toastify("error", error.response.data.message);
		},
		onSuccess: (data, variables, context) => {
			// Boom baby!
			Toastify("success", "Image Title updated successfully");
			window.location.reload();
		},
	});
};
export { useGetGallery, usePostGallery, useDeleteGallery, useUpdateGallery };
