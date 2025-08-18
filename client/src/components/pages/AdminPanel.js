import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { adminAPI } from '../../services/api';
import toast from 'react-hot-toast';

const AdminPanel = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', specialty: '', clinic: '', imageUrl: '' });

  const loadDoctors = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.listDoctors();
      setDoctors(res.data.doctors || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load doctors');
    } finally { setLoading(false); }
  };

  useEffect(() => { loadDoctors(); }, []);

  const handleCreate = async () => {
    try {
      const payload = {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        specialty: form.specialty,
        clinic: form.clinic,
        ...(form.imageUrl ? { imageUrl: form.imageUrl } : {}),
      };
      const res = await adminAPI.createDoctor(payload);
      toast.success('Doctor created');
      setForm({ fullName: '', email: '', phone: '', specialty: '', clinic: '', imageUrl: '' });
      loadDoctors();
    } catch (err) {
      console.error(err);
      toast.error('Failed to create doctor');
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminAPI.deleteDoctor(id);
      toast.success('Doctor removed');
      loadDoctors();
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove doctor');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-[linear-gradient(180deg,#e6f0ff_0%,#d7e8ff_25%,#cfe2ff_50%,#d0e1ff_75%,#eaf4ff_100%)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-sky-900 mb-4">Admin Panel</h2>
        <div className="glass-card p-4 mb-6">
          <h3 className="font-semibold mb-2">Create Doctor</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})} placeholder="Full name" className="p-2 rounded" />
            <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="p-2 rounded" />
            <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Phone" className="p-2 rounded" />
            <input value={form.specialty} onChange={e=>setForm({...form, specialty:e.target.value})} placeholder="Specialty" className="p-2 rounded" />
            <input value={form.clinic} onChange={e=>setForm({...form, clinic:e.target.value})} placeholder="Clinic" className="p-2 rounded" />
            <input value={form.imageUrl} onChange={e=>setForm({...form, imageUrl:e.target.value})} placeholder="Image URL" className="p-2 rounded" />
          </div>
          <div className="mt-3">
            <button onClick={handleCreate} className="glass-cta">Create Doctor</button>
          </div>
        </div>

        <div className="glass-card p-4">
          <h3 className="font-semibold mb-2">Doctors</h3>
          {loading ? <p>Loading...</p> : (
            <div className="space-y-3">
              {doctors.map(d => (
                <div key={d._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {d.imageUrl ? <img src={d.imageUrl} alt={d.fullName} className="w-12 h-12 rounded-full" /> : <div className="w-12 h-12 bg-sky-200 rounded-full" />}
                    <div>
                      <div className="font-semibold">{d.fullName}</div>
                      <div className="text-sm text-sky-700">{d.email} • {d.specialty}</div>
                    </div>
                  </div>
                  <div>
                    <button onClick={()=>handleDelete(d._id)} className="text-red-500">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
