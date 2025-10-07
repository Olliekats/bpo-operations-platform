import React, { useState } from 'react';
import { Upload, File, X, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FileUploadProps {
  bucket: string;
  path: string;
  onUploadComplete: (url: string, filename: string) => void;
  accept?: string;
  maxSizeMB?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  bucket,
  path,
  onUploadComplete,
  accept = '*',
  maxSizeMB = 10,
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${path}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      onUploadComplete(publicUrl, file.name);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block">
        <div className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
          {uploading ? (
            <div className="flex items-center gap-2 text-blue-600">
              <Loader2 size={20} className="animate-spin" />
              <span>Uploading...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-600">
              <Upload size={20} />
              <span>Click to upload file</span>
            </div>
          )}
        </div>
        <input
          type="file"
          onChange={handleFileChange}
          accept={accept}
          disabled={uploading}
          className="hidden"
        />
      </label>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <X size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

interface FileListProps {
  files: { url: string; name: string }[];
  onRemove: (url: string) => void;
}

export const FileList: React.FC<FileListProps> = ({ files, onRemove }) => {
  if (files.length === 0) return null;

  return (
    <div className="space-y-2">
      {files.map((file, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
        >
          <div className="flex items-center gap-2">
            <File size={18} className="text-blue-600" />
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              {file.name}
            </a>
          </div>
          <button
            onClick={() => onRemove(file.url)}
            className="text-slate-400 hover:text-red-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};
