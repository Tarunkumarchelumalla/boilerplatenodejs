import mongoose, { Document, Schema } from 'mongoose';

// Define the fileType schema
const FileTypeSchema = new Schema({
  filename: {
    type: String,
    trim: true,
  },
  path: {
    type: String,
    trim: true,
  },
});

// Define the trackingInfo schema
const TrackingInfoSchema = new Schema({
  ip: {
    type: String,
    trim: true,
  },
  userAgent: {
    type: String,
    trim: true,
  },
  referrer: {
    type: String,
    default: null,
    trim: true,
  },
  timestamp: {
    type: Date,
  },
  isOpened: {
    type: Boolean,
    default: false,
  },
});

// Define the Mail schema
interface IMail extends Document {
  from: string;
  to: string;
  templateID?: string;
  text?: string;
  scheduledTime?: Date;
  subject: string;
  attachments: { filename: string; path: string }[];
  status: string;
  UID: string;
  BID?: string;
  templateVariables: Record<string, any>;
  trackingInfo?: {
    ip: string;
    userAgent: string;
    referrer?: string;
    timestamp: Date;
    isOpened: boolean;
  };
}

const MailSchema = new Schema<IMail>({
  from: {
    type: String,
    required: true,
    trim: true,
  },
  to: {
    type: String,
    required: true,
    trim: true,
  },
  templateID: {
    type: String,
    default: null,
    trim: true,
  },
  text: {
    type: String,
    default: null,
    trim: true,
  },
  scheduledTime: {
    type: Date,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  attachments: [FileTypeSchema],
  status: {
    type: String,
    default: 'Pending',
    trim: true,
  },
  UID: {
    type: String,
    required: true,
    trim: true,
  },
  BID: {
    type: String,
    default: null,
    trim: true,
  },
  templateVariables: {
    type: Map,
    of: Schema.Types.Mixed,
    default: {},
  },
  trackingInfo: {
    type: TrackingInfoSchema,
    default: {
      ip:null,
      isOpened:false,
      referrer: null,
      timestamp: null,
      userAgent: null,
    },
  },
}, {
  timestamps: true,
});

export const Mails = mongoose.model<IMail>('mail-masters', MailSchema);
