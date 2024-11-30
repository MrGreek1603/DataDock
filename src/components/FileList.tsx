import { useEffect } from 'react';
import { Trash2, Download, FileIcon } from 'lucide-react';
import { useFiles } from '../hooks/useFiles';
import type { FileObject } from '../types';

export function FileList({ refreshTrigger }: { refreshTrigger: number }) {
  const { files, loading, loadFiles, deleteFile, downloadFile } = useFiles();

  useEffect(() => {
    loadFiles();
  }, [loadFiles, refreshTrigger]);

  if (loading) {
    return <div className="mt-8 text-center">Loading files...</div>;
  }

  if (files.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-500">
        No files uploaded yet. Start by dropping some files above!
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Your Files</h2>
      <div className="space-y-2">
        {files.map((file: FileObject) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <div className="flex items-center space-x-3">
              <FileIcon className="h-6 w-6 text-gray-500" />
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(file.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => downloadFile(file.name)}
                className="p-2 text-blue-600 hover:text-blue-800"
              >
                <Download className="h-5 w-5" />
              </button>
              <button
                onClick={() => deleteFile(file.name)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}