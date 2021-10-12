import React from 'react';
import { Dialog, Button } from '@material-ui/core';
import { useForm } from "react-hook-form";
import FormTextInput from "@/Components/Form/FormTextInput";
import axios from "axios";
import _ from 'underscore';

const EditDialog = ({ tenant, data, setData, onClose, ...props }) => {

  const { handleSubmit, control } = useForm();
  const [status, setStatus] = React.useState({ code: null });

  const submit = (formData) => {
    setStatus({ code: null });
    axios.put(`/management/tenants/${tenant.id}`, formData).then(function (response) {
      setData(data.map(d => d.id === tenant.id ? response.data.tenant : d));
      setStatus({ code: 'success' });
    }).catch(function (error) {
      setStatus({
        code: 'error',
        messages: _.flatten(_.values(error.response.data.errors))
      });
    });
  };

  const handleRemove = () => {
    setStatus({ code: null });
    axios.delete(`/management/tenants/${tenant.id}`).then(function (response) {
      setData(data.filter(d => d.id !== tenant.id));
      setStatus({ code: null });
      onClose();
    }).catch(function (error) {
      setStatus({
        code: 'error',
        messages: _.flatten(_.values(error.response.data.errors))
      });
    });
  };

  return (
    <Dialog onClose={onClose} {...props}>
      {tenant &&
        <form className="bg-transparent rounded-sm overflow-hidden max-w-md" onSubmit={handleSubmit(submit)}>
          <div className="bg-yellow-900 text-white text-center py-4">Edit Tenant</div>
          <div className="bg-white p-8 space-y-4">
            {status.code === 'success' &&
              <div className="py-2 text-green-600">
                Successfully Saved!
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
            <FormTextInput control={control} name="name" defaultValue={tenant.name} required />
            <FormTextInput control={control} name="code" defaultValue={tenant.code} required />
            <Button variant="contained" color="default" type="submit" fullWidth>
              Save
					  </Button>
            <Button variant="outlined" color="default" type="button" fullWidth onClick={handleRemove}>
              Remove
					  </Button>
          </div>
        </form>
      }
    </Dialog>
  );
};

export default EditDialog;