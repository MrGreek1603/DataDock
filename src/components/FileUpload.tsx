import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export function FileUpload({ onUploadComplete }: { onUploadComplete: () => void }) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      try {
        const { data, error } = await supabase.storage
          .from('files')
          .upload(`${Date.now()}-${file.name}`, file);

        if (error) throw error;
        toast.success('File uploaded successfully!');
        onUploadComplete();
      } catch (error) {
        toast.error('Error uploading file');
        console.error('Error:', error);
      }
    }
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      {isDragActive ? (
        <p className="mt-2 text-gray-600">Drop the files here...</p>
      ) : (
        <p className="mt-2 text-gray-600">
          Drag & drop files here, or click to select files
        </p>
      )}
    </div>
  );
}