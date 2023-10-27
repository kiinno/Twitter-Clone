import React, { useState, useCallback, useContext, useEffect } from "react";
import Input from "../Input";
import Modal from "../Modal";
import SystemContext from "@/utils/systemContext";
import axios from "axios";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import useAuthentications from "@/hooks/useAuthentications";
import useUser from "@/hooks/useUser";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
  const { data: loggedUser } = useAuthentications();
  const { mutate: mutateFetchedUser } = useUser(loggedUser?.user?._id);

  const system = useContext(SystemContext);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setName(loggedUser?.user?.name);
    setUsername(loggedUser?.user?.username);
    setCoverImage(loggedUser?.user?.coverImage);
    setProfileImage(loggedUser?.user?.profileImage);
    setBio(loggedUser?.user?.bio);
  }, [loggedUser]);

  const [isLoading, setIsLoading] = useState<any>(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.patch("/api/edit", {
        name,
        username,
        profileImage,
        coverImage,
        bio,
      });
      mutateFetchedUser();
      toast.success(`Successfully`);
      system.showEditModal(false);
    } catch (error) {
      toast.error("Somting went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [
    bio,
    coverImage,
    mutateFetchedUser,
    name,
    profileImage,
    system,
    username,
  ]);

  const bodyContent = (
    <div
      className="flex flex-col gap-4"
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          onSubmit();
        }
      }}
    >
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload Profile Image"
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload Cover Image"
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
        type="text"
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
        type="text"
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
        type="text"
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4 text-xs">
      <p>You can edit your profile many times</p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={system.editModal.isOpen}
      onSubmit={onSubmit}
      onClose={() => {
        system.showEditModal(false);
      }}
      title="Edit Profile"
      actionLabel="Save"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default EditModal;
