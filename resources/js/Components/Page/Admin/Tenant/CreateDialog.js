import React from 'react';
import { Dialog, Button } from '@material-ui/core';
import { useForm } from "react-hook-form";
import FormTextInput from "@/Components/Form/FormTextInput";
import axios from "axios";
import _ from 'underscore';

const CreateDialog = ({ data, setData, ...props }) => {

  const { handleSubmit, control, reset } = useForm();
  const [status, setStatus] = React.useState({ code: null });

  const submit = (formData) => {
    setStatus({ code: null });
    axios.post('/management/tenants', formData).then(function (response) {
      reset();
      setData([
        ...data,
        response.data.tenant
      ]);
      setStatus({ code: 'success' });
    }).catch(function (error) {
      setStatus({
        code: 'error',
        messages: _.flatten(_.values(error.response.data.errors))
      });
    });
  }

  return (
    <Dialog {...props}>
      <form className="bg-transparent rounded-sm overflow-hidden max-w-md" onSubmit={handleSubmit(submit)}>
        <div className="bg-yellow-900 text-white text-center py-4">Create Tenant</div>
        <div className="bg-white p-8 space-y-4">
          {status.code === 'success' &&
            <div className="py-2 text-green-600">
              New Tenant Created!
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
          <FormTextInput control={control} name="name" required />
          <FormTextInput control={control} name="code" required />
          <Button variant="contained" color="default" type="submit" fullWidth>
            Submit
					</Button>
        </div>
      </form>
    </Dialog>
  );
};

export default CreateDialog;