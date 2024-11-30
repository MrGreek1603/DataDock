import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { FileObject } from '../types';
import toast from 'react-hot-toast';

export function useFiles() {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFiles = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.storage.from('files').list();
      if (error) throw error;
      setFiles(data);
    } catch (error) {
      console.error('Error loading files:', error);
      toast.error('Error loading files');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteFile = useCallback(async (fileName: string) => {
    try {
      const { error } = await supabase.storage.from('files').remove([fileName]);
      if (error) throw error;
      toast.success('File deleted successfully');
      await loadFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Error deleting file');
    }
  }, [loadFiles]);

  const downloadFile = useCallback(async (fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('files')
        .download(fileName);
      if (error) throw error;

      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Error downloading file');
    }
  }, []);

  return {
    files,
    loading,
    loadFiles,
    deleteFile,
    downloadFile
  };
}