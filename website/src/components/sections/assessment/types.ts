export type InputType =
	| "single-choice"
	| "multi-choice"
	| "free-text"
	| "lead-capture";

export interface LeadField {
	name: string;
	type: string;
	required: boolean;
	placeholder: string;
}

export interface DimensionScore {
	dimension: string;
	score: number;
	tier: string;
	analysis: string;
}

export interface Recommendation {
	title: string;
	description: string;
	service_area: string;
}

export interface ReportPayload {
	overall_score: number;
	overall_tier: string;
	summary: string;
	dimensions: DimensionScore[];
	recommendations: Recommendation[];
}

export interface MessageMetadata {
	suggested_replies: string[];
	input_type: InputType;
	lead_fields: LeadField[];
	progress: number;
	is_report: boolean;
	report: ReportPayload | null;
	lead_data: Record<string, string> | null;
}

export interface ChatMessage {
	role: "user" | "assistant";
	content: string;
	metadata?: MessageMetadata | null;
	created_at?: string | null;
}

export interface StoredSession {
	sessionId: string;
	messages: ChatMessage[];
	leadData: Record<string, string>;
	progress: number;
	startedAt: string;
	lastMessageAt: string;
}
