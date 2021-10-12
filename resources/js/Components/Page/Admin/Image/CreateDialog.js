import React from 'react';
import { Dialog, Button } from '@material-ui/core';
import FormSelectNative from "@/Components/Form/FormSelectNative";
import axios from "axios";
import _ from 'underscore';

const CreateDialog = ({ data, setData, ...props }) => {

  const formRef = React.useRef(null);
  const [status, setStatus] = React.useState({ code: null });

  const submit = async () => {
    if (formRef.current) {
      setStatus({ code: null });

      const formData = new FormData(formRef.current);

      axios.post('/management/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        formRef.current.reset();
        setData({
          ...data,
          images: [
            ...data.images,
            ...response.data.images
          ]
        });
        setStatus({ code: 'success' });
      }).catch(function (error) {
        setStatus({
          code: 'error',
          messages: _.flatten(_.values(error.response.data.errors))
        });
      });
    }
  };

  return (
    <Dialog {...props}>
      <form className="bg-transparent rounded-sm overflow-hidden max-w-md" ref={formRef}>
        <div className="bg-yellow-900 text-white text-center py-4">Upload Images</div>
        <div className="bg-white p-8 space-y-4">
          {status.code === 'success' &&
            <div className="py-2 text-green-600">
              Successfully Uploaded!
            </div>
          }
          {status.code === 'error' &&
            <div className="py-2 text-red-500">
              <div>Request Failed</div>
              <ul className="list-disc text-sm pl-6">
                {status.messages.map(message =>
                  <li key={message}>{message}</li>
                )}
              </ul>
            </div>
          }
          {data.categories.length > 0 &&
            <FormSelectNative
              name="category_id"
              label="Category"
              required
              options={data.categories}
              defaultValue={''}
              valueKey="id"
              labelKey="name"
            />
          }
          <label className="block text-sm bg-gray-100 p-4">
            <input className="block w-full" type="file" name="images[]" multiple />
          </label>
          <Button variant="contained" color="default" fullWidth onClick={submit}>
            Submit
					</Button>
        </div>
      </form>
    </Dialog>
  );
};

export default CreateDialog;