import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import databaseService from "../../appwrite/dataBase";
import storageService from "../../appwrite/storage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Input, RTE, Select } from "../";

export default function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  // console.log(userData);


  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
        category: post?.category || "Information Technology",
      },
    });

  const submit = async (data) => {
    // console.log(data);
    if (post) {
      const file = data.image[0]
        ? await storageService.uploadFile(data.image[0])
        : null;

      if (file) {
        storageService.deleteFile(post.featuredImage);
      }

      const dbPost = await databaseService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      // console.log(dbPost);
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await storageService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;

        const dbPost = await databaseService.createPost({
          ...data,
          userId: userData.$id,
          userName: userData.name,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
          // console.log(dbPost);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
 
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <section className="p-6 dark:bg-gray-800  dark:text-gray-5">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col mx-auto space-y-12  dark:text-white text-gray-800"
      >
        <fieldset className="grid grid-cols-2 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900 bg-gray-50">
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3 ">
            <div className="col-span-full sm:col-span-3">
              <Input
                label="Title :"
                placeholder="Title"
                className="mb-4 text-black"
                {...register("title", { required: true })}
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4 text-black"
                {...register("slug", { required: true })}
                onInput={(e) => {
                  setValue("slug", slugTransform(e.currentTarget.value), {
                    shouldValidate: true,
                  });
                }}
              />
            </div>

            <div className="col-span-full sm:col-span-3">
              <label for="Category">Category:</label>

              <Select
                options={[
                  "Web Tech",
                  "Tech & Gadgets",
                  "Science & Innovation",
                  "Personal Finance",
                  "Arts & Culture",
                  "Travel Dest",
                  "Other",
                ]}
                className="mb-4"
                name="Category"
                {...register("category", { required: true })}
              />
            </div>
          

            <div className="col-span-full sm:col-span-3">
              <label for="Status">Status:</label>
              <Select
                options={["active", "inactive"]}
                className="mb-4"
                name="Status"
                {...register("status", { required: true })}
              />
            </div>

            <div className="col-span-full sm:col-span-3">
              <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif image/webp"
                {...register("image", { required: !post })}
              />
            </div>

            {post && (
              <div className="col-span-full sm:col-span-3 mb-4">
                <img
                  src={storageService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="rounded-lg"
                />
              </div>
            )}

            <div className="col-span-full">
              <RTE
                label="Content :"
                name="content"
                control={control}
                defaultValue={getValues("content")}
              />
            </div>

            <Button
              type="submit"
              bgColor={post ? "bg-green-500" : undefined}
              className="col-span-full sm:col-span-1 mb-4  dark:bg-violet-400 dark:text-gray-800 dark:divide-gray-700"
            >
              {post ? "Update" : "Submit"}
            </Button>
          </div>
        </fieldset>
      </form>
    </section>
  );
}
